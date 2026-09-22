import { api } from "../apis/api";

export const signupHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/api/v1/admin/signup", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const loginHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/api/v1/admin/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const blogs = async () => {
  try {
    const response = await api.get("/api/v1/admin/blogs");
    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export type BlogPayload = {
  title: string;
  body: string;
  author: string;
  metatags: string;
  thumbnail: string;
};

export const createBlog = async (payload: FormData) => {
  const response = await api.post("/api/v1/admin/blog", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateBlog = async ({ id, thumbnailFile, ...payload }: BlogPayload & { id: string; thumbnailFile?: File }) => {
  const requestPayload = thumbnailFile
    ? (() => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => formData.append(key, value));
        formData.append("thumbnail", thumbnailFile);
        return formData;
      })()
    : payload;
  const response = await api.patch(`/api/v1/admin/blog/${id}`, requestPayload, thumbnailFile ? {
    headers: { "Content-Type": "multipart/form-data" },
  } : undefined);
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await api.delete(`/api/v1/admin/blog/${id}`);
  return response.data;
};

export const blog = async (title: string) => {
  try {
    const response = await api.get(`/api/v1/admin/blog/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const jobs = async () => {
  try {
    const response = await api.get("/api/v1/admin/jobs");
    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const job = async (title: string) => {
  try {
    const response = await api.get(`/api/v1/admin/job/${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
};

export type JobPayload = {
  title: string;
  role: string;
  tags: string;
  overview: string;
  selectionProcess: string;
  applicationProcess: string;
  organization: string;
  eligiblity: string;
  qualification: string;
  branch: string;
  experience: string;
  salary: string;
  location: string;
  applicationDate: string;
  applicationDeadline: string;
  interviewDate: string;
  applyLink: string;
};

export const createJob = async (payload: JobPayload) => {
  const response = await api.post("/api/v1/admin/job", payload);
  return response.data;
};

export const updateJob = async ({ id, ...payload }: JobPayload & { id: string }) => {
  const response = await api.patch(`/api/v1/admin/job/${id}`, payload);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/api/v1/admin/job/${id}`);
  return response.data;
};

export const analysis = async () => {
  const response = await api.get("/api/v1/admin/analysis");
  return response.data;
};
