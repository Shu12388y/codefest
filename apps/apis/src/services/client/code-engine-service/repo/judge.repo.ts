import { userSubmission } from "../../../../schema/user-submission/userSubmission.model.js";
import { ResponseHelper } from "../../../../helpers/Response.js";

type SubmissionData = {
  userId?: string;
  submissionId?: string;
  code?: string;
  language?: string;
  stdout?: string;
  stderr?: string;
  stdin?: string;
  status?: string;
};

export class OnlineCodeJudgeRepo {
  static async findAll() {
    try {
      const data = await userSubmission.find().sort({ createdAt: -1 });
      const response = new ResponseHelper(1, "Found", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  static async find(submissionId: string) {
    try {
      const data = await userSubmission.findOne({ submissionId });

      if (!data) {
        const response = new ResponseHelper(-1, "Submission not exists");
        return response.response();
      }

      const response = new ResponseHelper(1, "Found", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  static async create(submission: SubmissionData) {
    try {
      const data = await userSubmission.create(submission);
      const response = new ResponseHelper(1, "Created", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  static async update(submissionId: string, submission: SubmissionData) {
    try {
      const data = await userSubmission.findOneAndUpdate(
        { submissionId },
        submission,
        { new: true, runValidators: true },
      );

      if (!data) {
        const response = new ResponseHelper(-1, "Submission not exists");
        return response.response();
      }

      const response = new ResponseHelper(1, "Updated", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }
}
