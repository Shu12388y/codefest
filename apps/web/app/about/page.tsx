import Link from "next/link";
import { ArrowRight, BookOpenCheck, BriefcaseBusiness, Code2, Target } from "lucide-react";

import { Card } from "@/components/ui/card";

export const dynamic = "force-static";

const principles = [
  { icon: Target, title: "Clarity over noise", description: "Focused roadmaps and practical explanations that help you understand what to learn next." },
  { icon: BookOpenCheck, title: "Practice with purpose", description: "Subject notes, DSA problems, and tests designed to turn passive study into progress." },
  { icon: BriefcaseBusiness, title: "Career-ready thinking", description: "Preparation that connects fundamentals with interviews, jobs, and the work beyond them." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-12 text-white shadow-lg sm:px-10 lg:px-14 lg:py-16 dark:bg-slate-800">
          <div className="relative z-10 max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">About The Code Concept</p><h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">A calmer way to prepare for what comes next.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">The Code Concept brings preparation, practice, and opportunity into one focused place for students and early-career engineers.</p></div><div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border-36 border-indigo-400/20" />
        </section>

        <section className="grid gap-10 py-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">Why we exist</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">Preparation should feel like progress.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">There is no shortage of resources. The hard part is knowing which ones matter, how they fit together, and how to keep moving when the syllabus feels too large. We are building a practical learning companion that makes that path easier to see.</p><p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">From GATE subjects and DSA patterns to job opportunities and career guidance, every part of the platform is designed around consistent, meaningful practice.</p></div>
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"><Code2 className="h-7 w-7 text-indigo-600 dark:text-indigo-400" /><p className="mt-6 text-2xl font-bold leading-tight text-slate-950 dark:text-slate-50">Learn the concept. Solve the problem. Build the career.</p><p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">One simple loop, repeated with intention.</p></Card>
        </section>

        <section className="border-t border-slate-200 pt-14 dark:border-slate-800"><div className="max-w-2xl"><h2 className="text-2xl font-bold text-slate-950 dark:text-slate-50">What guides the platform</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">A few principles shape how we organize every resource and workflow.</p></div><div className="mt-7 grid gap-5 md:grid-cols-3">{principles.map(({ icon: Icon, title, description }) => <Card key={title} className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-semibold text-slate-950 dark:text-slate-50">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p></Card>)}</div></section>

        <section className="mt-14 flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8 dark:border-slate-800 dark:bg-slate-900"><div><h2 className="text-xl font-bold text-slate-950 dark:text-slate-50">Have a question or an idea?</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">We would like to hear what would make your preparation better.</p></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">Talk to us <ArrowRight className="h-4 w-4" /></Link></section>
      </div>
    </main>
  );
}