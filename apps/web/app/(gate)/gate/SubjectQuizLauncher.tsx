"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, X } from "lucide-react";
import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { closeQuiz, generateQuiz, openQuiz, setSubtopic } from "@/store/quizReducer";

type Subject = {
  title: string;
  topics: string[];
  tone: string;
};

export function SubjectQuizLauncher({
  subject,
  children,
}: {
  subject: Subject;
  children: ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const quiz = useSelector((state: RootState) => state.quiz);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef<{ abort: () => void } | null>(null);

  useEffect(() => {
    if (!quiz.open || quiz.topic !== subject.title || !quiz.subtopic) return;

    debounceTimer.current = setTimeout(() => {
      request.current = dispatch(
        generateQuiz({ topic: subject.title, subtopic: quiz.subtopic }),
      );
    }, 2500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      request.current?.abort();
      request.current = null;
    };
  }, [dispatch, quiz.open, quiz.subtopic, quiz.topic, subject.title]);

  function openSubject() {
    dispatch(openQuiz({ topic: subject.title, subtopic: "" }));
  }

  async function startQuiz() {
    if (!quiz.generationId) return;

    dispatch(closeQuiz());

    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch (error) {
        console.error("Unable to enter fullscreen mode", error);
      }
    }

    router.push(
      `/gate/${encodeURIComponent(subject.title)}/${encodeURIComponent(quiz.subtopic)}/${quiz.generationId}`,
    );
  }

  return (
    <>
      <button type="button" className="block h-full w-full text-left" onClick={openSubject}>
        {children}
      </button>
      {quiz.open && quiz.topic === subject.title && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dispatch(closeQuiz());
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Start practice
                </p>
                <h2 id="quiz-dialog-title" className="mt-1 text-xl font-bold text-slate-950 dark:text-slate-50">
                  {subject.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => dispatch(closeQuiz())}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <label className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="subtopic">
              Choose a subtopic
            </label>
            <select
              id="subtopic"
              value={quiz.subtopic}
              onChange={(event) => {
                dispatch(setSubtopic(event.target.value));
              }}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="" disabled>
                Choose subtopic
              </option>
              {subject.topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            {quiz.generationError && <p className="mt-3 text-sm text-red-600">{quiz.generationError}</p>}
            <button
              type="button"
              disabled={quiz.generationLoading || !quiz.generationId}
              onClick={() => void startQuiz()}
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {quiz.generationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {quiz.generationLoading ? "Preparing questions..." : "Start quiz"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
