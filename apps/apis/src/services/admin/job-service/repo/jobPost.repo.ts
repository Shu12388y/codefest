import { ResponseHelper } from "../../../../helpers/Response.js";
import { JobPost } from "../../../../schema/job-posts/jobPosts.model.js";

export class JobPostRepo {
  private title: string;
  private role: string;
  private tags: string;
  private overview: string;
  private selectionProcess: string;
  private applicationProcess: string;
  private organization: string;
  private eligiblity: string;
  private qualification: string;
  private branch: string;
  private experience: string;
  private salary: string;
  private location: string;
  private applicationDate: string;
  private applicationDeadline: string;
  private interviewDate: string;
  private applyLink: string;

  constructor(
    title: string,
    role: string,
    tags: string,
    overview: string,
    selectionProcess: string,
    applicationProcess: string,
    organization: string,
    eligiblity: string,
    qualification: string,
    branch: string,
    experience: string,
    salary: string,
    location: string,
    applicationDate: string,
    applicationDeadline: string,
    interviewDate: string,
    applyLink: string,
  ) {
    this.title = title;
    this.role = role;
    this.tags = tags;
    this.overview = overview;
    this.selectionProcess = selectionProcess;
    this.applicationProcess = applicationProcess;
    this.organization = organization;
    this.eligiblity = eligiblity;
    this.qualification = qualification;
    this.branch = branch;
    this.experience = experience;
    this.salary = salary;
    this.location = location;
    this.applicationDate = applicationDate;
    this.applicationDeadline = applicationDeadline;
    this.interviewDate = interviewDate;
    this.applyLink = applyLink;
  }

  public async create() {
    try {
      const jobPost = new JobPost({
        title: this.title,
        role: this.role,
        tags: this.tags,
        overview: this.overview,
        selectionProcess: this.selectionProcess,
        applicationProcess: this.applicationProcess,
        organization: this.organization,
        eligiblity: this.eligiblity,
        qualification: this.qualification,
        branch: this.branch,
        experience: this.experience,
        salary: this.salary,
        location: this.location,
        applicationDate: this.applicationDate,
        applicationDeadline: this.applicationDeadline,
        interviewDate: this.interviewDate,
        applyLink: this.applyLink,
      });

      const data = await jobPost.save();
      const response = new ResponseHelper(1, "created", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  public static async findAll() {
    try {
      const data = await JobPost.find().sort({ createdAt: -1 });
      const response = new ResponseHelper(1, "Found", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  public static async find(title: string) {
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

  public async update(_id: string) {
    try {
      const data = await JobPost.findByIdAndUpdate(
        _id,
        {
          title: this.title,
          role: this.role,
          tags: this.tags,
          overview: this.overview,
          selectionProcess: this.selectionProcess,
          applicationProcess: this.applicationProcess,
          organization: this.organization,
          eligiblity: this.eligiblity,
          qualification: this.qualification,
          branch: this.branch,
          experience: this.experience,
          salary: this.salary,
          location: this.location,
          applicationDate: this.applicationDate,
          applicationDeadline: this.applicationDeadline,
          interviewDate: this.interviewDate,
          applyLink: this.applyLink,
        },
        { new: true, runValidators: true },
      );

      if (!data) {
        const response = new ResponseHelper(-1, "Job post not exists");
        return response.response();
      }

      const response = new ResponseHelper(1, "Updated", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }

  public static async delete(_id: string) {
    try {
      const data = await JobPost.findByIdAndDelete(_id);

      if (!data) {
        const response = new ResponseHelper(-1, "Job post not exists");
        return response.response();
      }

      const response = new ResponseHelper(1, "Deleted", data);
      return response.response();
    } catch (error) {
      const response = new ResponseHelper(-1, String(error));
      return response.response();
    }
  }
}
