import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Network,
  Sigma,
  TerminalSquare,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const dynamic = "force-static";

const subjects = [
  {
    number: "01",
    title: "General Aptitude",
    shortTitle: "Aptitude",
    description: "Build speed in verbal, quantitative, and analytical reasoning.",
    topics: ["Verbal ability", "Quantitative aptitude", "Analytical reasoning"],
    weight: "15 marks",
    level: "Foundation",
    icon: BrainCircuit,
    tone: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  },
  {
    number: "02",
    title: "Engineering Mathematics",
    shortTitle: "Mathematics",
    description: "Strengthen the mathematical tools behind every technical subject.",
    topics: ["Discrete mathematics", "Linear algebra", "Probability & calculus"],
    weight: "13 marks",
    level: "Foundation",
    icon: Sigma,
    tone: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
  },
  {
    number: "03",
    title: "Digital Logic",
    shortTitle: "Digital Logic",
    description: "Learn how logic gates become combinational and sequential circuits.",
    topics: ["Boolean algebra", "Combinational circuits", "Flip-flops & counters"],
    weight: "5 marks",
    level: "Core",
    icon: CircleDot,
    tone: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
  },
  {
    number: "04",
    title: "Computer Organization & Architecture",
    shortTitle: "COA",
    description: "Understand the machine beneath the code, from ISA to memory.",
    topics: ["Instruction sets", "Pipelining", "Cache & memory hierarchy"],
    weight: "8 marks",
    level: "Core",
    icon: Cpu,
    tone: "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
  },
  {
    number: "05",
    title: "Programming & Data Structures",
    shortTitle: "Programming",
    description: "Turn fundamentals into reliable solutions with classic structures.",
    topics: ["C programming", "Trees & graphs", "Stacks, queues & hashing"],
    weight: "10 marks",
    level: "Core",
    icon: Code2,
    tone: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300",
  },
  {
    number: "06",
    title: "Algorithms",
    shortTitle: "Algorithms",
    description: "Master the patterns that turn a correct idea into an efficient one.",
    topics: ["Sorting & searching", "Greedy methods", "Dynamic programming"],
    weight: "8 marks",
    level: "Core",
    icon: GitBranch,
    tone: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  {
    number: "07",
    title: "Theory of Computation",
    shortTitle: "TOC",
    description: "Move from finite automata to computability and complexity.",
    topics: ["Regular languages", "CFG & PDA", "Turing machines"],
    weight: "7 marks",
    level: "Core",
    icon: TerminalSquare,
    tone: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300",
  },
  {
    number: "08",
    title: "Compiler Design",
    shortTitle: "Compiler Design",
    description: "See how source code travels through a compiler pipeline.",
    topics: ["Lexical analysis", "Parsing", "Code optimization"],
    weight: "5 marks",
    level: "Core",
    icon: BookOpen,
    tone: "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
  },
  {
    number: "09",
    title: "Operating Systems",
    shortTitle: "Operating Systems",
    description: "Build intuition for processes, memory, files, and concurrency.",
    topics: ["Processes & threads", "Deadlocks", "Virtual memory"],
    weight: "9 marks",
    level: "Core",
    icon: TerminalSquare,
    tone: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
  },
  {
    number: "10",
    title: "Database Management Systems",
    shortTitle: "DBMS",
    description: "Model, query, and reason about reliable data systems.",
    topics: ["SQL & relational algebra", "Normalization", "Transactions"],
    weight: "8 marks",
    level: "Core",
    icon: Database,
    tone: "bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300",
  },
  {
    number: "11",
    title: "Computer Networks",
    shortTitle: "Networks",
    description: "Trace data from an application request to a packet on the wire.",
    topics: ["TCP/IP model", "Routing algorithms", "HTTP & transport"],
    weight: "8 marks",
    level: "Core",
    icon: Network,
    tone: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300",
  },
];

const studySteps = [
  ["Build the base", "Aptitude, Mathematics, Digital Logic"],
  ["Learn the machine", "COA, Programming, Data Structures"],
  ["Solve for depth", "Algorithms, TOC, Compiler Design"],
  ["Connect the systems", "Operating Systems, DBMS, Networks"],
];

export default function GatePage() {
  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 text-white shadow-lg sm:px-10 lg:px-14 lg:py-14 dark:bg-slate-800">
          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300"><span className="rounded-full bg-white/10 px-3 py-1.5">GATE CSE 2027</span><span className="text-slate-500">11 subjects · one clear path</span></div>
            <h1 className="mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">Your GATE preparation, organized.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Study the complete Computer Science syllabus in a deliberate order, revisit high-yield topics, and turn every subject into a stronger score.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="#subjects" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100">Explore subjects <ArrowRight className="h-4 w-4" /></Link><Link href="#roadmap" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10">View study order</Link></div>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border-36 border-indigo-400/20" /><div className="pointer-events-none absolute -bottom-40 right-20 h-80 w-80 rounded-full border border-white/10" />
        </section>

        <section id="roadmap" className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Suggested order</p><h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-50">A path that compounds</h2></div><div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:flex dark:bg-indigo-950/40 dark:text-indigo-300"><GitBranch className="h-5 w-5" /></div></div><div className="mt-7 grid gap-4 sm:grid-cols-2">{studySteps.map(([title, subjectsInStep], index) => <div key={title} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{index + 1}</span><div><h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{subjectsInStep}</p></div></div>)}</div></Card>
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><CheckCircle2 className="h-5 w-5" /></div><div><p className="text-xs uppercase tracking-wider text-slate-400">Your syllabus</p><h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">Ready to begin</h2></div></div><div className="mt-6 flex items-end justify-between"><span className="text-4xl font-bold text-slate-950 dark:text-slate-50">0%</span><span className="text-sm text-slate-500">0 of {subjects.length} subjects complete</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full w-0 rounded-full bg-emerald-500" /></div><p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">Start with a subject below. Your progress tracking will appear here as you practice.</p></Card>
        </section>

        <section id="subjects" className="mt-14 scroll-mt-8"><div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end dark:border-slate-800"><div><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Complete syllabus</p><h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-slate-50">All GATE CSE subjects</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Build breadth first, then use PYQs to find the marks hiding in each topic.</p></div><Badge variant="outline" className="w-fit">{subjects.length} subjects</Badge></div><div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{subjects.map((subject) => { const Icon = subject.icon; return <div key={subject.title} className="group"><Card className="flex h-full flex-col border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:border-slate-300 group-hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:group-hover:border-slate-600"><div className="flex items-start justify-between"><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${subject.tone}`}><Icon className="h-5 w-5" /></div><span className="text-xs font-semibold text-slate-400">{subject.number}</span></div><div className="mt-5 flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-slate-950 dark:text-slate-50">{subject.title}</h3><ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-slate-700 dark:group-hover:text-slate-200" /></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{subject.description}</p><div className="mt-5 flex flex-wrap gap-2">{subject.topics.map((topic) => <Badge key={topic} variant="outline" className="text-[11px]">{topic}</Badge>)}</div><div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800"><span className="text-xs font-medium text-slate-500">{subject.level}</span><span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{subject.weight}</span></div></Card></div>; })}</div></section>
      </div>
    </main>
  );
}