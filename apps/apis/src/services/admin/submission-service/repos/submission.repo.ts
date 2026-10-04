import { ResponseHelper } from "../../../../helpers/Response.js";
import { userSubmission } from "../../../../schema/user-submission/userSubmission.model.js";

export class SubmissionRepo {
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
}