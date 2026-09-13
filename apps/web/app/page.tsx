"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  GraduationCap,
  Code2,
  ClipboardList,
  Briefcase,
  Map,
  ArrowRight,
  Check,
  BookOpen,
  Rocket,
  TrendingUp,
  Target,
  Building2,
  // Linkedin,
  // Youtube,
  // Instagram,
} from "lucide-react";

import { cn } from "@/utils/cn";
import { HeroIllustration } from "@/components/_components/heroIllustration";

const features = [
  {
    icon: GraduationCap,
    title: "GATE Preparation",
    desc: "Structured subjects, PYQs, mock tests and preparation resources.",
    color:
      "bg-primary-50 text-primary-600 dark:bg-primary-600/10 dark:text-primary-400",
    link: "/gate",
  },
  {
    icon: Code2,
    title: "DSA Practice",
    desc: "Build problem-solving skills with structured coding practice.",
    color:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    link: "/dsa",
  },
  {
    icon: Briefcase,
    title: "Placement Preparation",
    desc: "CS fundamentals, aptitude, interviews and resume preparation.",
    color:
      "bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500",
    link: "/placement",
  },
  {
    icon: ClipboardList,
    title: "Quizzes & Tests",
    desc: "Practice, test yourself and understand your performance.",
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    link: "/quizzes",
  },
  {
    icon: Building2,
    title: "Latest Jobs",
    desc: "Discover private, PSU, government and internship opportunities.",
    color:
      "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    link: "/jobs",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    desc: "Know what to learn next and move towards your career goal.",
    color:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
    link: "/roadmap",
  },
];

const whyChooseUs = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    desc: "Follow a clear path from fundamentals to advanced topics.",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    desc: "Monitor your preparation with detailed analytics.",
  },
  {
    icon: Code2,
    title: "Practice More",
    desc: "Solve problems and take mock tests regularly.",
  },
  {
    icon: Briefcase,
    title: "Find Opportunities",
    desc: "Discover jobs that match your skills and goals.",
  },
  {
    icon: Target,
    title: "Stay Ahead",
    desc: "Keep up with trends, resources and career guidance.",
  },
];

const mockJobs = [
  {
    company: "BEL",
    logo: "BEL",
    role: "Graduate Engineer Trainee",
    qualification: "B.Tech CSE",
    tag: "GATE Eligible",
    category: "PSU",
  },
  {
    company: "TCS",
    logo: "TCS",
    role: "Software Engineer",
    qualification: "B.Tech / B.E.",
    tag: "Fresher",
    category: "Private",
  },
  {
    company: "DRDO",
    logo: "DRDO",
    role: "Scientist B",
    qualification: "B.Tech / M.Tech",
    tag: "GATE Eligible",
    category: "Government",
  },
  {
    company: "Zomato",
    logo: "Z",
    role: "SDE Intern",
    qualification: "B.Tech (pursuing)",
    tag: "Internship",
    category: "Internship",
  },
];

const blogPosts = [
  {
    title: "GATE 2027 Preparation Strategy",
    category: "GATE",
    readTime: "12 min read",
    image:
      "https://images.pexels.com/photos/5311610/pexels-photo-5311610.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
  },
  {
    title: "GATE CSE Syllabus & Subject Weightage",
    category: "GATE",
    readTime: "10 min read",
    image:
      "https://images.pexels.com/photos/249360/pexels-photo-249360.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
  },
  {
    title: "Best DSA Sheet for Placements",
    category: "DSA",
    readTime: "8 min read",
    image:
      "https://images.pexels.com/photos/1102797/pexels-photo-1102797.png?auto=compress&cs=tinysrgb&h=300&w=400",
  },
  {
    title: "How to Prepare for CSE Placements",
    category: "Career",
    readTime: "9 min read",
    image:
      "https://images.pexels.com/photos/5668857/pexels-photo-5668857.jpeg?auto=compress&cs=tinysrgb&h=300&w=400",
  },
];

const jobTabs = ["Private", "PSU", "Government", "Internship"];

export default function HomePage() {
  const [activeJobTab, setActiveJobTab] = useState("Private");

  const filteredJobs = mockJobs.filter(
    (job) => job.category === activeJobTab
  );

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-primary-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/20" />

        <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200/60 bg-primary-50/80 px-3 py-1 text-xs font-medium text-primary-700 dark:border-primary-600/30 dark:bg-primary-600/10 dark:text-primary-300">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary-500" />
                Your preparation. Your career. One platform.
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[60px] dark:text-slate-50">
                Prepare <span className="text-primary-600">Smarter</span>.
                <br />
                Build Your{" "}
                <span className="text-primary-600">Career</span>.
              </h1>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 dark:text-slate-400">
                One platform for GATE, placements, DSA, interviews, jobs and
                everything you need to move your career forward.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-700 active:scale-[0.98]"
                >
                  Start Your Preparation
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/gate"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Explore Platform
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-slate-500 dark:text-slate-400">
                {[
                  "GATE Preparation",
                  "DSA Practice",
                  "Placement Preparation",
                  "Latest Jobs",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5 text-success-500" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero illustration */}
            <div className="relative">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Everything You Need. One Platform.
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              From preparation to placement — build the skills, practice
              consistently and discover the right opportunities.
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="group rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-200 hover:border-primary-200 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-600/30"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      feature.color
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {feature.desc}
                  </p>

                  <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Explore
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Students Choose */}
      <section className="bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Why Students Choose The Code Concept
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A structured approach to career preparation — built for serious
              learners.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-600/10 dark:text-primary-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Find Opportunities That Match Your Goals
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Browse private, PSU, government and internship opportunities.
            </p>
          </div>

          <div className="mb-6 flex justify-center gap-1.5">
            {jobTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveJobTab(tab)}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200",
                  activeJobTab === tab
                    ? "bg-primary-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {filteredJobs.map((job) => (
              <div
                key={job.company}
                className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 transition-colors duration-200 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                    {job.logo}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {job.company}
                    </h3>

                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {job.role}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md bg-primary-50 px-2 py-0.5 text-[10px] font-semibold text-primary-700 dark:bg-primary-600/10 dark:text-primary-300">
                    {job.tag}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  {job.qualification}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline"
            >
              Explore Latest Jobs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
              Learn. Prepare. Stay Updated.
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Articles and guides to help you prepare smarter.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Link
                key={post.title}
                href="/blog"
                className="group block"
              >
                <div className="relative h-36 overflow-hidden rounded-xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-semibold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-primary-600 dark:text-slate-100">
                  {post.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  {post.readTime}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 p-10 text-center sm:p-14">
            <div className="absolute right-6 top-6 opacity-10">
              <Rocket className="h-20 w-20 text-white" />
            </div>

            <div className="relative">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your Next Opportunity Starts With Your Next Step.
              </h2>

              <p className="mt-3 text-sm text-primary-100">
                Build your preparation with The Code Concept.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-primary-700 transition-all duration-200 hover:bg-primary-50 active:scale-[0.98]"
                >
                  Create Your Free Account
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/gate"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                >
                  Explore Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white">
                  CC
                </div>

                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  The <span className="text-primary-600">Code</span> Concept
                </span>
              </div>

              <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Your preparation. Your career. One platform.
              </p>

              {/* <div className="mt-3.5 flex gap-2">
                {[Linkedin, Youtube, Instagram].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label="Social media"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 text-slate-500 transition-colors duration-200 hover:border-primary-300 hover:text-primary-600 dark:border-slate-700 dark:text-slate-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div> */}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Platform
              </h4>

              <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/gate" className="hover:text-primary-600">
                    GATE
                  </Link>
                </li>
                <li>
                  <Link href="/placement" className="hover:text-primary-600">
                    Placement
                  </Link>
                </li>
                <li>
                  <Link href="/dsa" className="hover:text-primary-600">
                    DSA
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-primary-600">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-primary-600">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary-600">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Company
              </h4>

              <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-primary-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Support
              </h4>

              <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="/help" className="hover:text-primary-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-primary-600">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-5 text-center text-xs text-slate-400 dark:border-slate-800">
            © 2026 The Code Concept
          </div>
        </div>
      </footer>
    </div>
  );
}