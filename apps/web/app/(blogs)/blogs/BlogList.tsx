"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/emptyState";
import { getBlogCategories, type Blog } from "@/lib/blogs";

type BlogListProps = { blogs: Blog[] };

function blogHref(title: string) {
  return `/blog/${encodeURIComponent(title)}`;
}

function blogTags(blog: Blog) {
  return blog.metatags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(date));
}

export function BlogList({ blogs }: BlogListProps) {
  const categories = getBlogCategories(blogs);
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = blogs.filter(
    (blog) => activeCategory === "All" || blogTags(blog).includes(activeCategory),
  );
  const featured = filtered[0];
  const latest = filtered.slice(1);

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
            The Code Concept
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50 sm:text-4xl">
            Ideas for your next career move
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
            Articles, guides, and insights to help you prepare, practice, and
            find your next opportunity.
          </p>
        </header>

        <section aria-label="Featured article">
          {featured ? (
            <Link href={blogHref(featured.title)} className="block">
              <Card className="group overflow-hidden border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div
                    className="min-h-64 bg-linear-to-br from-primary-500 to-blue-500 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02] lg:min-h-80"
                    style={{ backgroundImage: `url("${featured.thumbnail}")` }}
                  >
                    <div className="flex h-full items-start justify-between bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/20 p-5 sm:p-7">
                      <Badge className="border-0 bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm">
                        Featured article
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <Badge variant="default" className="w-fit">
                      {blogTags(featured)[0] || "Blog"}
                    </Badge>
                    <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-950 dark:text-slate-50 sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {featured.body}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{featured.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(featured.createdAt)}</span>
                      <span className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400"><Clock className="h-3.5 w-3.5" />Read article</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ) : (
            <EmptyState icon={<ArrowRight className="h-8 w-8" />} title="No articles found" description="Try a different category." />
          )}
        </section>

        <section className="space-y-5" aria-label="Blog categories">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-50">Browse articles</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Filter by topic to find focused preparation advice.</p>
            </div>
            <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as string)}>
              <TabsList className="h-10 max-w-full overflow-x-auto">
                {categories.map((category) => <TabsTrigger key={category} value={category} className="px-3">{category}</TabsTrigger>)}
              </TabsList>
            </Tabs>
          </div>

          {latest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((blog) => (
                <Link key={blog._id} href={blogHref(blog.title)} className="group block">
                  <Card className="h-full overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div
                      className="h-44 bg-linear-to-br from-primary-500 to-blue-500 bg-cover bg-center"
                      style={{ backgroundImage: `url("${blog.thumbnail}")` }}
                    />
                    <div className="flex min-h-52 flex-col p-5">
                      <Badge variant="default" className="w-fit">{blogTags(blog)[0] || "Blog"}</Badge>
                      <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-950 dark:text-slate-50">{blog.title}</h3>
                      <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-400">{blog.body}</p>
                      <div className="mt-auto flex items-center gap-3 pt-5 text-xs text-slate-500 dark:text-slate-400"><span>{blog.author}</span><span>•</span><span>{formatDate(blog.createdAt)}</span></div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}