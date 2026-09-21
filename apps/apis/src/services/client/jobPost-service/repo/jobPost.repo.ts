import { ResponseHelper } from "../../../../helpers/Response.js";
import { JobPost } from "../../../../schema/job-posts/jobPosts.model.js";

export class JobPostRepo {
  static async findAll() {
    try {
      const data = await JobPost.find().sort({ createdAt: -1 });
      const response = new ResponseHelper(1, "Found", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  static async find(title: string) {
    try {
      const data = await JobPost.findOne({ title });

      if (!data) {
        const response = new ResponseHelper(-1, "Job post not exists");
        return response.response();
      }

      const response = new ResponseHelper(1, "Found", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }
}
