import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getBlog, getBlogs } from "@/lib/blogs";

type BlogPageProps = { params: Promise<{ title: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ title: blog.title }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { title } = await params;
  const blog = await getBlog(title);
  return blog ? { title: blog.title, description: blog.body.slice(0, 160) } : { title: "Blog not found" };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { title } = await params;
  const blog = await getBlog(title);
  if (!blog) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 animate-fade-in">
      <Link
        href="/blogs"
        className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blogs
      </Link>
      <p className="text-sm font-medium text-primary-600">{blog.metatags}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">{blog.title}</h1>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>{blog.author}</span><span>•</span>
        <time dateTime={blog.createdAt}>{new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(blog.createdAt))}</time>
      </div>
      <div
        className="mt-10 aspect-2/1 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url("${blog.thumbnail}")` }}
      />
      <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-slate-700 dark:text-slate-300">{blog.body}</div>
    </article>
  );
}