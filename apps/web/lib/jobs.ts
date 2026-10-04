export type Job = {
  _id: string;
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
  createdAt?: string;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

function normalizeJob(job: Partial<Job> & { _id?: string | { toString(): string } }): Job {
  return {
    _id: job._id ? String(job._id) : job.title || "",
    title: job.title || "Untitled job",
    role: job.role || "",
    tags: job.tags || "",
    overview: job.overview || "",
    selectionProcess: job.selectionProcess || "",
    applicationProcess: job.applicationProcess || "",
    organization: job.organization || "",
    eligiblity: job.eligiblity || "",
    qualification: job.qualification || "",
    branch: job.branch || "",
    experience: job.experience || "",
    salary: job.salary || "",
    location: job.location || "",
    applicationDate: job.applicationDate || "",
    applicationDeadline: job.applicationDeadline || "",
    interviewDate: job.interviewDate || "",
    applyLink: job.applyLink || "",
    createdAt: job.createdAt,
  };
}

export async function getJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/jobs`, { cache: "no-store" });
    if (!response.ok) return [];
    const result = (await response.json()) as { data?: Job[] };
    return Array.isArray(result.data) ? result.data.map(normalizeJob) : [];
  } catch {
    return [];
  }
}

export async function getJob(title: string): Promise<Job | null> {
  try {
    const decodedTitle = decodeURIComponent(title);
    const response = await fetch(`${API_URL}/api/v1/job/${encodeURIComponent(decodedTitle)}`, { cache: "no-store" });
    if (!response.ok) return null;
    const result = (await response.json()) as { data?: Job };
    return result.data ? normalizeJob(result.data) : null;
  } catch {
    return null;
  }
}