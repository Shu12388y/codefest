type SubmissionRequest = {
  languageId: number;
  sourceCode: string;
  stdin?: string;
};

type SubmissionResponse = {
  token?: string;
  [key: string]: unknown;
};

export class OnlineCodeJudge {
  constructor(
    private readonly token: string,
    private readonly url: string,
  ) {}

  async submission({
    languageId,
    sourceCode,
    stdin = "",
  }: SubmissionRequest): Promise<SubmissionResponse> {
    if (!this.token) {
      throw new Error("Judge0 API token is required");
    }

    if (!this.url) {
      throw new Error("Judge0 API URL is required");
    }

    if (!Number.isInteger(languageId)) {
      throw new Error("Judge0 languageId must be an integer");
    }

    if (!sourceCode) {
      throw new Error("Judge0 sourceCode is required");
    }

    const response = await fetch(
      `${this.url.replace(/\/$/, "")}/submissions?base64_encoded=true&fields=*`,
      {
        method: "POST",
        headers: {
          "x-rapidapi-key": this.token,
          "x-rapidapi-host": new URL(this.url).host,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: Buffer.from(sourceCode, "utf8").toString("base64"),
          stdin: Buffer.from(stdin, "utf8").toString("base64"),
        }),
      },
    );

    const responseBody = (await response.json()) as SubmissionResponse;

    if (!response.ok) {
      throw new Error(
        `Judge0 submission failed (${response.status}): ${JSON.stringify(responseBody)}`,
      );
    }

    return responseBody;
  }

  async getSubmission(submissionToken: string): Promise<SubmissionResponse> {
    if (!this.token) {
      throw new Error("Judge0 API token is required");
    }

    if (!this.url) {
      throw new Error("Judge0 API URL is required");
    }

    if (!submissionToken) {
      throw new Error("Judge0 submission token is required");
    }

    const response = await fetch(
      `${this.url.replace(/\/$/, "")}/submissions/${encodeURIComponent(
        submissionToken,
      )}?base64_encoded=true&fields=*`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": this.token,
          "x-rapidapi-host": new URL(this.url).host,
        },
      },
    );

    const responseBody = (await response.json()) as SubmissionResponse;

    if (!response.ok) {
      throw new Error(
        `Judge0 submission lookup failed (${response.status}): ${JSON.stringify(responseBody)}`,
      );
    }

    return responseBody;
  }
}