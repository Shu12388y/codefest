import { ResponseHelper } from "../../../../helpers/Response.js";
import { Blogs } from "../../../../schema/blogs/blogs.model.js";

export class BlogRepo {
  static async findAll() {
    try {
      const data = await Blogs.find().sort({ createdAt: -1 });
      const response = new ResponseHelper(1, "Found", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  static async find(title: string) {
    try {
      const data = await Blogs.findOne({ title });

      if (!data) {
        const response = new ResponseHelper(-1, "Blog not exists");
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
