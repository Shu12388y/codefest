import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  FileText,
  ExternalLink,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { Badge } from "../../../components/ui/badge";

import { Button } from "../../../components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

type Blog = {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  status: "Published" | "Draft" | "Scheduled";
  views: number;
  publishedAt: string;
};

const blogs: Blog[] = [
  {
    id: "BLOG-001",
    title: "Understanding System Design for Beginners",
    slug: "understanding-system-design-for-beginners",
    author: "Shubham Paul",
    category: "System Design",
    status: "Published",
    views: 12482,
    publishedAt: "Sep 16, 2026",
  },
  {
    id: "BLOG-002",
    title: "Complete Guide to Binary Search",
    slug: "complete-guide-to-binary-search",
    author: "Avinash Singh",
    category: "DSA",
    status: "Published",
    views: 9821,
    publishedAt: "Sep 14, 2026",
  },
  {
    id: "BLOG-003",
    title: "Building Scalable APIs with Node.js",
    slug: "building-scalable-apis-nodejs",
    author: "Rohit Kumar",
    category: "Backend",
    status: "Published",
    views: 7634,
    publishedAt: "Sep 12, 2026",
  },
  {
    id: "BLOG-004",
    title: "Docker and Kubernetes Explained",
    slug: "docker-kubernetes-explained",
    author: "Shubham Paul",
    category: "DevOps",
    status: "Scheduled",
    views: 0,
    publishedAt: "Sep 22, 2026",
  },
  {
    id: "BLOG-005",
    title: "How Hash Tables Work Internally",
    slug: "how-hash-tables-work",
    author: "Priya Sharma",
    category: "DSA",
    status: "Draft",
    views: 0,
    publishedAt: "-",
  },
  {
    id: "BLOG-006",
    title: "React Server Components Deep Dive",
    slug: "react-server-components-deep-dive",
    author: "Aman Verma",
    category: "React",
    status: "Published",
    views: 6521,
    publishedAt: "Sep 08, 2026",
  },
  {
    id: "BLOG-007",
    title: "PostgreSQL Performance Optimization",
    slug: "postgresql-performance-optimization",
    author: "Neha Gupta",
    category: "Database",
    status: "Published",
    views: 5214,
    publishedAt: "Sep 06, 2026",
  },
  {
    id: "BLOG-008",
    title: "Introduction to Redis and Caching",
    slug: "introduction-redis-caching",
    author: "Arjun Patel",
    category: "Backend",
    status: "Draft",
    views: 0,
    publishedAt: "-",
  },
  {
    id: "BLOG-009",
    title: "Clean Code Principles Every Developer Should Know",
    slug: "clean-code-principles",
    author: "Rahul Sharma",
    category: "Programming",
    status: "Published",
    views: 8932,
    publishedAt: "Sep 02, 2026",
  },
  {
    id: "BLOG-010",
    title: "Introduction to Graph Algorithms",
    slug: "introduction-graph-algorithms",
    author: "Sneha Das",
    category: "DSA",
    status: "Scheduled",
    views: 0,
    publishedAt: "Sep 24, 2026",
  },
];

const ITEMS_PER_PAGE = 5;

const statusStyles = {
  Published:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",

  Draft:
    "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400",

  Scheduled:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
};

export default function BlogManagement() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(
    blogs.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (page - 1) * ITEMS_PER_PAGE;

  const currentBlogs = blogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Card className="rounded-2xl border shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />

            <CardTitle className="text-xl">
              Blogs
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage, publish and monitor your blog articles.
          </p>
        </div>

        <Button>
          + Create Blog
        </Button>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[110px]">
                  ID
                </TableHead>

                <TableHead>
                  Blog
                </TableHead>

                <TableHead>
                  Author
                </TableHead>

                <TableHead>
                  Category
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Views
                </TableHead>

                <TableHead>
                  Published
                </TableHead>

                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentBlogs.map((blog) => (
                <TableRow
                  key={blog.id}
                  className="hover:bg-muted/30"
                >
                  {/* ID */}
                  <TableCell>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {blog.id}
                    </span>
                  </TableCell>

                  {/* Blog */}
                  <TableCell>
                    <div className="max-w-[360px]">
                      <p className="truncate font-medium">
                        {blog.title}
                      </p>

                      <p className="mt-1 truncate font-mono text-xs text-muted-foreground">
                        /{blog.slug}
                      </p>
                    </div>
                  </TableCell>

                  {/* Author */}
                  <TableCell>
                    <span className="text-sm">
                      {blog.author}
                    </span>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant="secondary">
                      {blog.category}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        statusStyles[blog.status]
                      }
                    >
                      {blog.status}
                    </Badge>
                  </TableCell>

                  {/* Views */}
                  <TableCell>
                    {blog.views.toLocaleString()}
                  </TableCell>

                  {/* Published */}
                  <TableCell className="text-sm text-muted-foreground">
                    {blog.publishedAt}
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Blog
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                blogs.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {blogs.length}
            </span>{" "}
            blogs
          </p>

          <div className="flex items-center gap-1">
            {/* Previous */}
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            {/* Pages */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <Button
                key={pageNumber}
                variant={
                  page === pageNumber
                    ? "default"
                    : "outline"
                }
                size="sm"
                className="h-9 w-9"
                onClick={() =>
                  setPage(pageNumber)
                }
              >
                {pageNumber}
              </Button>
            ))}

            {/* Next */}
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

