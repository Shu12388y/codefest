import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Clock3, MapPin, Search, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Job } from "@/lib/jobs";

type JobListProps = { jobs: Job[] };

function jobHref(title: string) {
  return `/jobs/${encodeURIComponent(title)}`;
}

function tags(job: Job) {
  return job.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export function JobList({ jobs }: JobListProps) {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 text-white shadow-lg sm:px-10 lg:px-14 lg:py-14 dark:bg-slate-800">
          <div className="relative z-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Career opportunities</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Find work worth preparing for.</h1><p className="mt-4 max-w-xl text-base leading-7 text-slate-300">Fresh roles, internships, and public-sector opportunities curated for students and early-career engineers.</p><div className="mt-7 flex flex-wrap gap-3"><div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-slate-200"><BriefcaseBusiness className="h-4 w-4" />{jobs.length} opportunities</div><div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-slate-200"><Sparkles className="h-4 w-4" />Updated regularly</div></div></div>
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full border-36 border-white/10" />
        </header>

        <div className="mt-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800"><div><h2 className="text-xl font-semibold text-slate-950 dark:text-slate-50">Latest opportunities</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Compare roles and open the ones that fit your next step.</p></div><div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900"><Search className="h-4 w-4" />Browse all roles</div></div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link key={job._id || job.title} href={jobHref(job.title)} className="group block">
              <Card className="flex h-full flex-col border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-400 group-hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-slate-600">
                <div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><BriefcaseBusiness className="h-5 w-5" /></div><ArrowRight className="mt-2 h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-slate-700 dark:group-hover:text-slate-100" /></div>
                <div className="mt-5 flex flex-wrap gap-2">{tags(job).slice(0, 2).map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
                <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-snug text-slate-950 dark:text-slate-50">{job.title}</h3><p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">{job.organization}</p><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{job.overview}</p>
                <div className="mt-auto space-y-2 border-t border-slate-100 pt-5 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400"><span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{job.location || "Location not specified"}</span><span className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" />{job.experience || "Early career"}</span><span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" />Apply by {job.applicationDeadline || "See details"}</span></div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}