"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, CheckCircle2, ChevronDown, Code2, Lightbulb, Play, RotateCcw, Send, Terminal, XCircle } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { DsaQuestion } from "@/lib/dsaQuestions";
import type { AppDispatch, RootState } from "@/store/store";
import {
  initializeWorkspace,
  applyImprovedCode,
  requestHint,
  resetCode,
  runCode,
  setCode,
  setLanguage,
  submitCode,
  type WorkspaceLanguage,
} from "@/store/workspaceReducer";

type QuestionWorkspaceProps = { id: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function QuestionWorkspace({ id }: QuestionWorkspaceProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { code, language, result, output, submitted, hint, improvedCode, hintLoading, hintError } = useSelector((state: RootState) => state.workspace);
  const [question, setQuestion] = useState<DsaQuestion | null>(null);
  const [loading, setLoading] = useState(true);

  const languageExtension = useMemo(() => {
    if (language === "Python") return python();
    if (language === "Java") return java();
    return javascript({ typescript: language === "TypeScript" });
  }, [language]);

  useEffect(() => {
    dispatch(initializeWorkspace(decodeURIComponent(id)));
  }, [dispatch, id]);

  useEffect(() => {
    let active = true;
    const questionId = decodeURIComponent(id);

    async function loadQuestion() {
      try {
        const response = await fetch(`${API_URL}/api/v1/admin/question/${encodeURIComponent(questionId)}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Question not found");
        const payload = (await response.json()) as { data?: DsaQuestion };
        if (active && payload.data) setQuestion(payload.data);
      } catch {
        if (active) setQuestion(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadQuestion();
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="h-7 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-6 grid gap-4 lg:grid-cols-2"><div className="h-128 rounded-md bg-slate-100 dark:bg-slate-900" /><div className="h-128 rounded-md bg-slate-100 dark:bg-slate-900" /></div></main>;
  }

  if (!question) {
    return <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6"><XCircle className="mx-auto h-10 w-10 text-rose-500" /><h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Question not found</h1><Link href="/dsa-sheets" className="mt-6 inline-flex text-sm font-medium text-primary-600 hover:underline">Back to DSA sheet</Link></main>;
  }

  const tags = question.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  const hintQuestion = `${question.title}\n\n${question.description}\n\nExample input: ${question.testInput}`;

  return (
    <main className="min-h-screen bg-[#f7f7f8] dark:bg-slate-950">
      <div className="mx-auto max-w-[1500px] px-3 py-4 sm:px-5 lg:px-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/dsa-sheets" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"><ArrowLeft className="h-4 w-4" />All problems</Link>
          <div className="flex items-center gap-2"><Badge variant="outline" className="rounded-md bg-white dark:bg-slate-900">Practice</Badge><span className="text-xs text-slate-400">Problem workspace</span></div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(560px,1.08fr)]">
          <Card className="overflow-hidden rounded-md border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-7">
              <div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"><Code2 className="h-5 w-5" /></div><div><h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-50">{question.title}</h1><div className="mt-3 flex flex-wrap gap-2">{tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div></div></div>
            </div>
            <div className="space-y-7 px-5 py-6 sm:px-7">
              <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700 dark:text-slate-300">{question.description}</p>
              <section className="rounded-md border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/60 dark:bg-amber-950/20">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-950 dark:text-amber-200"><Lightbulb className="h-4 w-4" />AI hint</div>
                  <Button type="button" variant="outline" size="sm" className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-transparent dark:text-amber-200 dark:hover:bg-amber-950/50" disabled={hintLoading} onClick={() => void dispatch(requestHint({ question: hintQuestion, code, language }))}>
                    {hintLoading ? "Thinking..." : hint ? "New hint" : "Get a hint"}
                  </Button>
                </div>
                {hint && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-amber-900 dark:text-amber-100">{hint}</p>}
                {improvedCode && <div className="mt-4 border-t border-amber-200 pt-4 dark:border-amber-900/60"><div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-300">Suggested improvement</p><Button type="button" size="sm" variant="outline" className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-transparent dark:text-amber-200 dark:hover:bg-amber-950/50" onClick={() => dispatch(applyImprovedCode(improvedCode))}>Apply code</Button></div><pre className="mt-3 max-h-64 overflow-auto rounded-md bg-slate-950 p-3 text-xs leading-5 text-slate-200">{improvedCode}</pre></div>}
                {hintError && <p className="mt-3 text-sm text-rose-700 dark:text-rose-300">{hintError}</p>}
                {!hint && !hintError && <p className="mt-2 text-xs text-amber-800/70 dark:text-amber-200/70">Get a nudge without revealing the complete solution.</p>}
              </section>
              <div><h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Example</h2><div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"><div className="grid gap-4 p-4 font-mono text-xs leading-6 text-slate-600 dark:text-slate-400 sm:grid-cols-2"><div><p className="mb-1 font-sans font-semibold text-slate-400">Input</p><code>{question.testInput}</code></div><div><p className="mb-1 font-sans font-semibold text-slate-400">Output</p><code>{question.testOutput}</code></div></div></div></div>
              <div><h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Constraints & test data</h2><pre className="overflow-x-auto rounded-md bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-300">{question.judgeInput}</pre></div>
            </div>
          </Card>

          <Card className="flex min-h-150 flex-col overflow-hidden rounded-md border-slate-800 bg-[#1f1f1f] shadow-none">
            <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#282828] px-4 py-2"><div className="flex items-center gap-2 text-sm font-medium text-slate-200"><Terminal className="h-4 w-4 text-slate-400" />Code</div><label className="relative flex items-center text-xs text-slate-300"><select value={language} onChange={(event) => dispatch(setLanguage(event.target.value as WorkspaceLanguage))} className="appearance-none rounded-md border border-white/10 bg-[#333333] px-3 py-1.5 pr-8 text-xs font-medium text-slate-200 outline-none transition-colors hover:bg-[#3b3b3b] focus:ring-2 focus:ring-blue-500/50"><option>JavaScript</option><option>TypeScript</option><option>Python</option><option>Java</option></select><ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-slate-400" /></label></div>
            <div className="min-h-97.5 flex-1 bg-[#282c34] px-1"><CodeMirror value={code} onChange={(value) => dispatch(setCode(value))} extensions={[languageExtension]} theme={oneDark} height="390px" basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true, highlightActiveLine: true }} aria-label="Code editor" /></div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#282828] px-4 py-2.5"><Button variant="ghost" size="sm" className="text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => dispatch(resetCode())}><RotateCcw className="h-3.5 w-3.5" />Reset</Button><div className="flex gap-2"><Button variant="outline" size="sm" className="border-white/15 bg-transparent text-slate-200 hover:bg-white/10 hover:text-white" onClick={() => dispatch(runCode())}><Play className="h-3.5 w-3.5" />Run</Button><Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-500" onClick={() => dispatch(submitCode())}><Send className="h-3.5 w-3.5" />Submit</Button></div></div>
            <div className="border-t border-white/10 bg-[#202020] px-4 py-3"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Test result {result === "success" && <span className="normal-case tracking-normal text-emerald-400"><CheckCircle2 className="mr-1 inline h-3.5 w-3.5" />{submitted ? "Submitted" : "Accepted"}</span>}</div><p className="mt-2 text-sm text-slate-400">{output}</p></div>
          </Card>
        </div>
      </div>
    </main>
  );
}