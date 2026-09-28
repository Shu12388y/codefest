import Link from "next/link";
import { ArrowRight, CheckCircle2, Code2, ListFilter, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DsaQuestion } from "@/lib/dsaQuestions";

type DsaQuestionListProps = { questions: DsaQuestion[] };

function questionHref(title: string) {
  return `/dsa-sheets/questions/${encodeURIComponent(title)}`;
}

export function DsaQuestionList({ questions }: DsaQuestionListProps) {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 dark:border-slate-800 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">DSA Sheet</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">Practice like you mean it.</h1>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">A focused set of coding problems to build patterns, speed, and interview confidence.</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"><span className="block text-xl font-bold text-slate-950 dark:text-slate-50">{questions.length}</span>Problems</div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"><span className="block text-xl font-bold text-emerald-600">0</span>Solved</div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              <p className="mb-3 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><ListFilter className="h-3.5 w-3.5" />Study plan</p>
              <div className="rounded-lg bg-primary-600 px-3 py-2.5 text-sm font-medium text-white">All problems <span className="float-right text-primary-100">{questions.length}</span></div>
              <div className="flex items-center justify-between px-3 py-2.5 text-sm text-slate-500"><span>Arrays & Hashing</span><span>1</span></div>
              <div className="flex items-center justify-between px-3 py-2.5 text-sm text-slate-500"><span>Strings & Stack</span><span>1</span></div>
              <div className="flex items-center justify-between px-3 py-2.5 text-sm text-slate-500"><span>Dynamic Programming</span><span>1</span></div>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div><h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">All problems</h2><p className="mt-1 text-sm text-slate-500">Start with the fundamentals and build up.</p></div>
              <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 sm:flex dark:border-slate-800 dark:bg-slate-900"><Search className="h-4 w-4" />Search</div>
            </div>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <Link key={question._id || question.title} href={questionHref(question.title)} className="group block">
                  <Card className="border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary-200 group-hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-primary-800 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"><Code2 className="h-4 w-4" /></div>
                      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-medium text-slate-400">{String(index + 1).padStart(2, "0")}</span><h3 className="font-semibold text-slate-900 group-hover:text-primary-600 dark:text-slate-100 dark:group-hover:text-primary-400">{question.title}</h3>{index === 0 && <Badge variant="secondary">Easy start</Badge>}</div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{question.description}</p><div className="mt-4 flex flex-wrap gap-2">{question.tags.split(",").map((tag) => <Badge key={tag} variant="outline">{tag.trim()}</Badge>)}</div></div>
                      <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-slate-400"><CheckCircle2 className="h-4 w-4" />New problems will appear here as you add them from the admin panel.</p>
          </section>
        </div>
      </div>
    </main>
  );
}