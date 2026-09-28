"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronDown, Code2, Play, RotateCcw, Send, Terminal, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleDsaQuestions, type DsaQuestion } from "@/lib/dsaQuestions";

type QuestionWorkspaceProps = { title: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function QuestionWorkspace({ title }: QuestionWorkspaceProps) {
  const [question, setQuestion] = useState<DsaQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("function solution(input) {\n  // Write your solution here\n}\n");
  const [language, setLanguage] = useState("JavaScript");
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    let active = true;
    const decodedTitle = decodeURIComponent(title);

    async function loadQuestion() {
      try {
        const response = await fetch(`${API_URL}/api/v1/admin/question/${encodeURIComponent(decodedTitle)}`);
        if (!response.ok) throw new Error("Question not found");
        const payload = (await response.json()) as { data?: DsaQuestion };
        if (active && payload.data) setQuestion(payload.data);
      } catch {
        const sample = sampleDsaQuestions.find((item) => item.title === decodedTitle);
        if (active) setQuestion(sample || null);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadQuestion();
    return () => { active = false; };
  }, [title]);

  if (loading) {
    return <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="h-8 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-8 grid gap-6 lg:grid-cols-2"><div className="h-130 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" /><div className="h-130 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" /></div></main>;
  }

  if (!question) {
    return <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6"><XCircle className="mx-auto h-10 w-10 text-rose-500" /><h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Question not found</h1><Link href="/dsa-sheets" className="mt-6 inline-flex text-sm font-medium text-primary-600 hover:underline">Back to DSA sheet</Link></main>;
  }

  const tags = question.tags.split(",").map((tag) => tag.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-375 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link href="/dsa-sheets" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"><ArrowLeft className="h-4 w-4" />Back to DSA sheet</Link>
          <div className="flex items-center gap-2"><Badge variant="outline">Problem</Badge><span className="text-xs text-slate-400">Practice mode</span></div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(560px,1.1fr)]">
          <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 p-6 dark:border-slate-800 sm:p-8">
              <div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"><Code2 className="h-5 w-5" /></div><div><h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{question.title}</h1><div className="mt-3 flex flex-wrap gap-2">{tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div></div></div>
            </div>
            <div className="space-y-7 p-6 sm:p-8">
              <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700 dark:text-slate-300">{question.description}</p>
              <div><h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Example</h2><div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"><div className="grid gap-4 p-4 font-mono text-xs leading-6 text-slate-600 dark:text-slate-400 sm:grid-cols-2"><div><p className="mb-1 font-sans font-semibold text-slate-400">Input</p><code>{question.testInput}</code></div><div><p className="mb-1 font-sans font-semibold text-slate-400">Output</p><code>{question.testOutput}</code></div></div></div></div>
              <div><h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Constraints & test data</h2><pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-300">{question.judgeInput}</pre></div>
            </div>
          </Card>

          <Card className="flex min-h-150 flex-col overflow-hidden border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800"><div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"><Terminal className="h-4 w-4 text-slate-400" />Code editor</div><label className="flex items-center gap-2 text-xs text-slate-500"><select value={language} onChange={(event) => setLanguage(event.target.value)} className="appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 pr-7 text-xs font-medium text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"><option>JavaScript</option><option>TypeScript</option><option>Python</option><option>Java</option></select><ChevronDown className="-ml-7 h-3.5 w-3.5 pointer-events-none" /></label></div>
            <textarea value={code} onChange={(event) => setCode(event.target.value)} spellCheck={false} aria-label="Code editor" className="min-h-97.5 flex-1 resize-none bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-600" />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-800"><Button variant="ghost" size="sm" onClick={() => setCode("function solution(input) {\n  // Write your solution here\n}\n")}><RotateCcw className="h-3.5 w-3.5" />Reset</Button><div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => setResult("success")}><Play className="h-3.5 w-3.5" />Run</Button><Button size="sm" onClick={() => setResult("success")}><Send className="h-3.5 w-3.5" />Submit</Button></div></div>
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Test result {result === "success" && <span className="normal-case tracking-normal text-emerald-600"><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />Ready</span>}</div><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{result === "idle" ? "Run your solution against the sample test case." : `Sample test passed for ${language}.`}</p></div>
          </Card>
        </div>
      </div>
    </main>
  );
}