import { Inngest } from "inngest";
import { DB_CONNECT } from "../../database/db.js";
import { DSAQuestionRepo } from "../../services/admin/dsa-question-service/repos/dsaQuestion.repo.js";
import { OnlineCodeJudgeRepo } from "../../services/client/code-engine-service/repo/judge.repo.js";
import { ENV } from "../../env/env.js";
import { OnlineCodeJudge } from "../judge-0/judge.js";

const inngest = new Inngest({
  id: "my-application",
});

const helloFn = inngest.createFunction(
  {
    id: "hello-function",
    triggers: {
      event: "event/hello.world",
    },
  },
  async ({ event, step }) => {
    console.log(event);
  },
);

const decodeJudgeOutput = (value: unknown): string => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  return Buffer.from(String(value), "base64").toString("utf8");
};

const saveSubmissionResult = async (
  submissionId: string,
  submissionResult: Record<string, unknown>,
) => {
  const response = await OnlineCodeJudgeRepo.updateById(submissionId, {
    stdout: decodeJudgeOutput(submissionResult.stdout),
    stderr: decodeJudgeOutput(submissionResult.stderr),
    status:
      typeof submissionResult.status === "object" &&
      submissionResult.status !== null &&
      "description" in submissionResult.status
        ? String(
            (submissionResult.status as { description?: unknown }).description ??
              "",
          )
        : "",
  });

  if (response.statusCode === -1) {
    throw new Error(response.message);
  }
};

const submissionFn = inngest.createFunction(
  {
    id: "judge0-submission",
    triggers: {
      event: "event/code.submission",
    },
  },
  async ({ event, step }) => {
    try {
      const data = event.data;
      const { code, language_id, question_id, type, submission_id } = data;
      if (!submission_id || typeof submission_id !== "string") {
        throw new Error("Invalid submission id");
      }
      await DB_CONNECT(ENV.DB_URI);
      const question = await DSAQuestionRepo.findById(question_id);
      if (!question) {
        throw new Error("Invalid question id");
      }

      if (type === "submission") {
        const onlineJudge = new OnlineCodeJudge(ENV.JUDGE_TOKEN, ENV.JUDGE_URL);
        const result = await onlineJudge.submission({
          languageId: language_id,
          sourceCode: code,
          stdin: question.data.testInput,
          expected_output: question.data.judgeOutput,
        });

        const pendingStatusIds = new Set([1, 2]);
        const submissionInfo = new Promise((resolve, reject) => {
          const timerId = setInterval(async () => {
            try {
              const submission = await onlineJudge.getSubmission(
                result.token as string,
              );

              const statusId = (submission as { status?: { id?: number } })
                .status?.id;
              if (statusId !== undefined && !pendingStatusIds.has(statusId)) {
                clearInterval(timerId);
                resolve(submission);
                return;
              }
            } catch (error) {
              clearInterval(timerId);
              reject(error);
            }
          }, 6000);
        });

        const submissionResult =
          (await submissionInfo) as Record<string, unknown>;
        await saveSubmissionResult(submission_id, submissionResult);
        console.log(submissionResult);
      } else {
        const onlineJudge = new OnlineCodeJudge(ENV.JUDGE_TOKEN, ENV.JUDGE_URL);
        const result = await onlineJudge.submission({
          languageId: language_id,
          sourceCode: code,
          stdin: question.data.testInput,
          expected_output: question.data.testOutput,
        });

        const pendingStatusIds = new Set([1, 2]);
        const submissionInfo = new Promise((resolve, reject) => {
          const timerId = setInterval(async () => {
            try {
              const submission = await onlineJudge.getSubmission(
                result.token as string,
              );

              const statusId = (submission as { status?: { id?: number } })
                .status?.id;
              if (statusId !== undefined && !pendingStatusIds.has(statusId)) {
                clearInterval(timerId);
                resolve(submission);
                return;
              }
            } catch (error) {
              clearInterval(timerId);
              reject(error);
            }
          }, 6000);
        });

        const submissionResult =
          (await submissionInfo) as Record<string, unknown>;
        await saveSubmissionResult(submission_id, submissionResult);
        console.log(submissionResult);
      }
    } catch (error) {
      throw new Error(String(error));
    }
  },
);

const functions = [helloFn, submissionFn];

export { inngest, functions };
