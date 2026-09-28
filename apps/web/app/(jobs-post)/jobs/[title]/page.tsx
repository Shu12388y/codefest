import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, CheckCircle2, GraduationCap, MapPin, WalletCards } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getJob, getJobs } from "@/lib/jobs";

type JobPageProps = { params: Promise<{ title: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ title: job.title }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { title } = await params;
  const job = await getJob(title);
  return job ? { title: `${job.title} | ${job.organization}`, description: job.overview } : { title: "Job not found" };
}

function tags(job: NonNullable<Awaited<ReturnType<typeof getJob>>>) {
  return job.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export default async function JobDetailsPage({ params }: JobPageProps) {
  const { title } = await params;
  const job = await getJob(title);
  if (!job) notFound();

  const details = [
    { label: "Location", value: job.location, icon: MapPin },
    { label: "Experience", value: job.experience, icon: BriefcaseBusiness },
    { label: "Qualification", value: job.qualification, icon: GraduationCap },
    { label: "Salary", value: job.salary, icon: WalletCards },
  ].filter((detail) => detail.value);

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"><ArrowLeft className="h-4 w-4" />Back to jobs</Link>
        <Card className="mt-7 overflow-hidden border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 bg-slate-900 px-6 py-10 text-white sm:px-10 dark:border-slate-800 dark:bg-slate-800"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"><div><div className="flex flex-wrap gap-2">{tags(job).map((tag) => <Badge key={tag} className="border-0 bg-white/15 text-slate-100">{tag}</Badge>)}</div><h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">{job.title}</h1><p className="mt-3 text-lg text-slate-300">{job.organization}{job.role ? ` · ${job.role}` : ""}</p></div>{job.applyLink && <a href={job.applyLink} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100">Apply now</a>}</div></div>
          <div className="grid gap-4 border-b border-slate-200 p-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 sm:p-8">{details.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950"><Icon className="h-4 w-4 text-slate-700 dark:text-slate-300" /><p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{value}</p></div>)}</div>
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-9"><section><h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">About the opportunity</h2><p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-600 dark:text-slate-400">{job.overview}</p></section><section><h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Eligibility</h2><div className="mt-3 space-y-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400"><p>{job.eligiblity || "Review the official job notification for eligibility requirements."}</p>{job.branch && <p><strong className="font-semibold text-slate-800 dark:text-slate-200">Eligible branches:</strong> {job.branch}</p>}</div></section><section><h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Selection process</h2><p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-600 dark:text-slate-400">{job.selectionProcess}</p></section><section><h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">How to apply</h2><p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-600 dark:text-slate-400">{job.applicationProcess}</p></section></div>
            <aside className="space-y-4"><Card className="border-slate-200 bg-slate-50 p-5 shadow-none dark:border-slate-800 dark:bg-slate-950"><h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Important dates</h2><div className="mt-4 space-y-4 text-sm">{[["Applications open", job.applicationDate], ["Application deadline", job.applicationDeadline], ["Interview", job.interviewDate]].map(([label, value]) => <div key={label} className="flex gap-3"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-700 dark:text-slate-300" /><div><p className="text-xs text-slate-400">{label}</p><p className="mt-0.5 font-medium text-slate-700 dark:text-slate-300">{value || "To be announced"}</p></div></div>)}</div></Card><div className="flex items-start gap-2 text-xs leading-5 text-slate-400"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />Always verify details on the official application page before applying.</div></aside>
          </div>
        </Card>
      </div>
    </main>
  );
}