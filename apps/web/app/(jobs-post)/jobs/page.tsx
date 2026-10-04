import { JobList } from "./JobList";
import { getJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
	const jobs = await getJobs();
	return <JobList jobs={jobs} />;
}
