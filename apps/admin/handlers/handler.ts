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
