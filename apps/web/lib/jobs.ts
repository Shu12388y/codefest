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

export const sampleJobs: Job[] = [
  {
    _id: "sample-bel-get",
    title: "Graduate Engineer Trainee 2026",
    role: "Graduate Engineer Trainee",
    tags: "PSU, GATE, Full-time",
    organization: "Bharat Electronics Limited",
    overview: "BEL is hiring Graduate Engineer Trainees to work on mission-critical defence electronics and communication systems.",
    selectionProcess: "Shortlisting through GATE score followed by an interview.",
    applicationProcess: "Apply online through the BEL careers portal and upload your GATE score details.",
    eligiblity: "Engineering graduates with a valid GATE score and Indian citizenship.",
    qualification: "B.E. / B.Tech",
    branch: "Computer Science, Electronics, Electrical",
    experience: "Freshers",
    salary: "INR 12 LPA - 16 LPA",
    location: "Across India",
    applicationDate: "Sep 15, 2026",
    applicationDeadline: "Oct 15, 2026",
    interviewDate: "To be announced",
    applyLink: "https://bel-india.in/careers/",
  },
  {
    _id: "sample-tcs-sde",
    title: "Software Engineer - Campus Hiring",
    role: "Software Engineer",
    tags: "Private, Fresher, Full-time",
    organization: "Tata Consultancy Services",
    overview: "Join TCS as a software engineer and build products for global clients across cloud, data, and enterprise technology.",
    selectionProcess: "Online aptitude and coding assessment followed by technical and HR interviews.",
    applicationProcess: "Register through the TCS careers portal with your updated resume and academic details.",
    eligiblity: "Graduating students with no active backlogs and consistent academic performance.",
    qualification: "B.E. / B.Tech / M.E. / M.Tech",
    branch: "All engineering branches",
    experience: "0-1 years",
    salary: "INR 7 LPA - 9 LPA",
    location: "Multiple locations",
    applicationDate: "Sep 20, 2026",
    applicationDeadline: "Oct 10, 2026",
    interviewDate: "Oct 25, 2026",
    applyLink: "https://www.tcs.com/careers",
  },
  {
    _id: "sample-zomato-intern",
    title: "Software Development Engineer Intern",
    role: "SDE Intern",
    tags: "Internship, Private, Engineering",
    organization: "Zomato",
    overview: "Work with product and engineering teams to build reliable experiences used by millions of customers and partners.",
    selectionProcess: "Resume shortlisting, coding round, and technical interviews.",
    applicationProcess: "Apply with your resume and links to relevant projects or coding profiles.",
    eligiblity: "Students graduating in 2027 or 2028 with strong programming fundamentals.",
    qualification: "B.E. / B.Tech",
    branch: "Computer Science or related branches",
    experience: "Students",
    salary: "INR 60,000 / month",
    location: "Gurugram / Hybrid",
    applicationDate: "Sep 22, 2026",
    applicationDeadline: "Oct 20, 2026",
    interviewDate: "Rolling interviews",
    applyLink: "https://www.zomato.com/careers",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/jobs`, { cache: "force-cache" });
    if (!response.ok) return sampleJobs;
    const result = (await response.json()) as { data?: Job[] };
    return result.data?.length ? result.data : sampleJobs;
  } catch {
    return sampleJobs;
  }
}

export async function getJob(title: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_URL}/api/v1/job/${encodeURIComponent(title)}`, { cache: "force-cache" });
    if (!response.ok) return sampleJobs.find((job) => job.title === title) || null;
    const result = (await response.json()) as { data?: Job };
    return result.data || null;
  } catch {
    return sampleJobs.find((job) => job.title === title) || null;
  }
}