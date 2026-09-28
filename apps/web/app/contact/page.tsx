"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send } from "lucide-react";

import { Card } from "@/components/ui/card";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Get in touch</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl">Let us know what you are working toward.</h1><p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">Questions, feedback, or an idea for the platform? Send a note and we will get back to you.</p></header>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-4"><Card className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300"><Mail className="h-5 w-5" /></div><h2 className="mt-5 font-semibold text-slate-950 dark:text-slate-50">Email us</h2><a href="mailto:hello@thecodeconcept.in" className="mt-2 block text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">hello@thecodeconcept.in</a></Card><Card className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><MessageSquare className="h-5 w-5" /></div><h2 className="mt-5 font-semibold text-slate-950 dark:text-slate-50">For feedback</h2><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Tell us which subject, workflow, or resource would make the platform more useful.</p></Card><div className="flex items-center gap-2 px-1 text-xs text-slate-400"><MapPin className="h-4 w-4" />Built for learners everywhere</div></div>
          <Card className="border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"><div className="mb-7"><h2 className="text-xl font-bold text-slate-950 dark:text-slate-50">Send a message</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">We usually respond within two working days.</p></div>{sent ? <div className="flex min-h-72 flex-col items-center justify-center text-center"><CheckCircle2 className="h-12 w-12 text-emerald-500" /><h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-slate-50">Thanks for reaching out.</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">Your message has been noted. We will follow up soon.</p><button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">Send another message</button></div> : <form onSubmit={handleSubmit} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">Name<input required name="name" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950" placeholder="Your name" /></label><label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">Email<input required type="email" name="email" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950" placeholder="you@example.com" /></label></div><label className="block space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">Subject<input required name="subject" className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950" placeholder="How can we help?" /></label><label className="block space-y-2 text-sm font-medium text-slate-700 dark:text-slate-300">Message<textarea required name="message" rows={6} className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950" placeholder="Write your message..." /></label><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"><Send className="h-4 w-4" />Send message</button></form>}</Card>
        </div>
      </div>
    </main>
  );
}