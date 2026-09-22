"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/emptyState";
import { articles, blogCategories } from "@/data/articles";
import { cn } from "@/utils/cn";

const thumbnailGradients: Record<string, string> = {
  "gradient-1": "from-primary-500 to-blue-500",
  "gradient-2": "from-blue-500 to-cyan-500",
  "gradient-3": "from-success-500 to-emerald-500",
  "gradient-4": "from-amber-500 to-orange-500",
  "gradient-5": "from-rose-500 to-pink-500",
  "gradient-6": "from-primary-600 to-primary-400",
  "gradient-7": "from-cyan-500 to-blue-500",
  "gradient-8": "from-violet-500 to-primary-500",
  "gradient-9": "from-amber-500 to-rose-500",
  "gradient-10": "from-emerald-500 to-teal-500",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = articles.find((article) => article.featured);

  const filtered = articles.filter(
    (article) =>
      activeCategory === "All" ||
      article.category === activeCategory
  );

  const latest = filtered.filter(
    (article) => !article.featured
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Blog
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Articles, guides, and insights for your career
        </p>
      </div>

      {/* Featured Article */}
      {featured && activeCategory === "All" && (
        <Link href={`/blog/${featured.id}`}>
          <Card className="overflow-hidden">
            <div
              className={cn(
                "h-48 bg-gradient-to-br sm:h-56",
                thumbnailGradients[featured.thumbnail]
              )}
            >
              <div className="flex h-full items-end p-6">
                <Badge className="bg-white/20 text-white backdrop-blur-sm">
                  Featured
                </Badge>
              </div>
            </div>

            <div className="p-5">
              <Badge variant="default">
                {featured.category}
              </Badge>

              <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                {featured.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {featured.excerpt}
              </p>

              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {featured.author}
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {featured.date}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </span>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {/* Categories */}
      <Tabs
        value={activeCategory}
        onValueChange={(value) => setActiveCategory(value as string)}
      >
        <TabsList>
          {blogCategories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Articles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={<ArrowRight className="h-8 w-8" />}
              title="No articles found"
              description="Try a different category."
            />
          </div>
        ) : (
          latest.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
            >
              <Card
                className="h-full overflow-hidden"
              >
                <div
                  className={cn(
                    "h-32 bg-gradient-to-br",
                    thumbnailGradients[article.thumbnail] ||
                      thumbnailGradients["gradient-1"]
                  )}
                />

                <div className="p-4">
                  <Badge variant="default">
                    {article.category}
                  </Badge>

                  <h4 className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {article.title}
                  </h4>

                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                    {article.excerpt}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}