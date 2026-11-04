"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import {
  finishQuiz,
  loadQuizQuestions,
  nextQuestion,
  previousQuestion,
  selectOption,
} from "@/store/quizReducer";
const optionLabels = ["a", "b", "c", "d"] as const;

export default function QuizPage() {
  const params = useParams<{ slug: string[] }>();
  const router = useRouter();
  const slug = params.slug ?? [];
  const id = slug.at(-1);
  const topic = slug[0] ? decodeURIComponent(slug[0]) : "GATE practice";
  const subtopic = slug[1] ? decodeURIComponent(slug[1]) : "";
  const dispatch = useDispatch<AppDispatch>();
  const quiz = useSelector((state: RootState) => state.quiz);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const { questions, currentQuestion: current, selectedOption: selected, score } = quiz;

  useEffect(() => {
    function handleFullscreenChange() {
      if (!document.fullscreenElement) setFullscreenWarning(true);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && document.fullscreenElement) {
        event.preventDefault();
        setFullscreenWarning(true);
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleEscape, true);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleEscape, true);
    };
  }, []);

  async function returnToFullscreen() {
    try {
      await document.documentElement.requestFullscreen();
      setFullscreenWarning(false);
    } catch (requestError) {
      console.error("Unable to return to fullscreen mode", requestError);
    }
  }

  async function leaveQuiz() {
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (requestError) {
        console.error("Unable to exit fullscreen mode", requestError);
      }
    }
    router.push("/gate");
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    void dispatch(loadQuizQuestions(id));
  }, [id]);

  const question = questions[current];
  const progress = useMemo(() => (questions.length ? ((current + 1) / questions.length) * 100 : 0), [current, questions.length]);

  if (quiz.questionsLoading) {
    return <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 dark:bg-slate-950"><div className="flex items-center gap-3 text-slate-600 dark:text-slate-300"><Loader2 className="h-5 w-5 animate-spin text-indigo-600" />Generating your quiz...</div></main>;
  }
  if (quiz.questionsError || !question) {
    return <main className="mx-auto max-w-2xl px-4 py-16 text-center text-red-600">{quiz.questionsError || "Quiz unavailable."}</main>;
  }
  if (score !== null) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
          <h1 className="mt-4 text-2xl font-bold text-slate-950 dark:text-slate-50">Quiz complete</h1>
          <p className="mt-2 text-slate-500">You answered {score} of {questions.length} correctly.</p>
          <button
            type="button"
            onClick={() => void leaveQuiz()}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Back to subjects
          </button>
        </section>
      </main>
    );
  }

  const isLast = current === questions.length - 1;
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      {fullscreenWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <section className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-950 dark:text-slate-50">
              Fullscreen mode exited
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Please return to fullscreen mode to continue the quiz.
            </p>
            <button
              type="button"
              onClick={() => void returnToFullscreen()}
              className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Return to fullscreen
            </button>
          </section>
        </div>
      )}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{topic}</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-slate-50">{subtopic} practice</h1>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} /></div>
          <p className="mt-2 text-sm text-slate-500">Question {current + 1} of {questions.length}</p>
        </div>
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-xl font-semibold leading-8 text-slate-950 dark:text-slate-50">{question.question}</h2>
          <div className="mt-8 grid gap-3">
            {optionLabels.map((key) => (
              <button type="button" key={key}               onClick={() => dispatch(selectOption(key))} className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${selected === key ? "border-indigo-500 bg-indigo-50 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-100" : "border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-600"}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold uppercase dark:bg-slate-800">{key}</span>
                <span className="pt-1 text-sm leading-6">{question.options[key]}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <div className="flex w-full justify-between gap-3">
              <button
                type="button"
                disabled={current === 0}
                onClick={() => dispatch(previousQuestion())}
                className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!selected}
                onClick={() => dispatch(isLast ? finishQuiz() : nextQuestion())}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLast ? "Finish quiz" : "Next question"}
                {isLast && <CheckCircle2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}