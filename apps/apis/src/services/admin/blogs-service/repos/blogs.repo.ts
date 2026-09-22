import { ResponseHelper } from "../../../../helpers/Response.js";
import { Blogs } from "../../../../schema/blogs/blogs.model.js";

export class BlogsRepo {
  private title: string;
  private body: string;
  private thumbnail: string;
  private author: string;
  private metatags: string;

  constructor(
    title: string,
    body: string,
    thumbnail: string,
    author: string,
    metatags: string,
  ) {
    this.title = title;
    this.body = body;
    this.thumbnail = thumbnail;
    this.author = author;
    this.metatags = metatags;
  }

  public async create() {
    try {
      const blog = new Blogs({
        title: this.title,
        body: this.body,
        thumbnail: this.thumbnail,
        author: this.author,
        metatags: this.metatags,
      });
      const data = await blog.save();
      const _r = new ResponseHelper(1, "created", data);
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }

  static async findAll() {
    try {
      const data = await Blogs.find({}).sort({ createdAt: -1 });
      const _r = new ResponseHelper(1, "Found", data);
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }

  static async find(title: string) {
    try {
      const data = await Blogs.findOne({ title: title });

      if (!data) {
        const _r = new ResponseHelper(-1, "Blog not exists");
        return _r.response();
      }

      const _r = new ResponseHelper(1, "Found", data);
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }

  public async update(_id: string) {
    try {
      const data = await Blogs.findByIdAndUpdate(
        { _id },
        {
          title: this.title,
          body: this.body,
          thumbnail: this.thumbnail,
          author: this.author,
          metatags: this.metatags,
        },
        { new: true, runValidators: true },
      );

      if (!data) {
        const _r = new ResponseHelper(-1, "Blog not exists");
        return _r.response();
      }

      const _r = new ResponseHelper(1, "Updated", data);
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }

  static async delete(_id: string) {
    try {
      const data = await Blogs.findByIdAndDelete({ _id });

      if (!data) {
        const _r = new ResponseHelper(-1, "Blog not exists");
        return _r.response();
      }

      const _r = new ResponseHelper(1, "Deleted", data);
      return _r.response();
    } catch (error) {
      const _r = new ResponseHelper(-1, String(error));
      return _r.response();
    }
  }
}
