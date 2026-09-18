import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
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
import { Link } from "react-router";

type Question = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  acceptance: string;
  submissions: number;
  status: "Published" | "Draft";
  createdAt: string;
};

const questions: Question[] = [
  {
    id: "DSA-001",
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: "49.2%",
    submissions: 12482,
    status: "Published",
    createdAt: "Sep 12, 2026",
  },
  {
    id: "DSA-002",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: "38.7%",
    submissions: 9821,
    status: "Published",
    createdAt: "Sep 10, 2026",
  },
  {
    id: "DSA-003",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topic: "Linked List",
    acceptance: "41.3%",
    submissions: 7234,
    status: "Published",
    createdAt: "Sep 08, 2026",
  },
  {
    id: "DSA-004",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees",
    acceptance: "56.8%",
    submissions: 6543,
    status: "Published",
    createdAt: "Sep 06, 2026",
  },
  {
    id: "DSA-005",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    acceptance: "67.4%",
    submissions: 15432,
    status: "Published",
    createdAt: "Sep 04, 2026",
  },
  {
    id: "DSA-006",
    title: "Word Search",
    difficulty: "Medium",
    topic: "Backtracking",
    acceptance: "44.1%",
    submissions: 5231,
    status: "Draft",
    createdAt: "Sep 03, 2026",
  },
  {
    id: "DSA-007",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Two Pointers",
    acceptance: "48.5%",
    submissions: 8124,
    status: "Published",
    createdAt: "Sep 01, 2026",
  },
  {
    id: "DSA-008",
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: "51.2%",
    submissions: 10321,
    status: "Published",
    createdAt: "Aug 30, 2026",
  },
  {
    id: "DSA-009",
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Linked List",
    acceptance: "72.3%",
    submissions: 18231,
    status: "Published",
    createdAt: "Aug 28, 2026",
  },
  {
    id: "DSA-010",
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graphs",
    acceptance: "46.7%",
    submissions: 6321,
    status: "Draft",
    createdAt: "Aug 25, 2026",
  },
];

const ITEMS_PER_PAGE = 5;

const difficultyStyles = {
  Easy: "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

export default function DSAQuestions() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(
    questions.length / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentQuestions = questions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Card className="rounded-2xl border shadow-sm">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">
            DSA Questions
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage coding problems, difficulty, topics and
            publication status.
          </p>
        </div>
<Link to={"/add-question"}>
        <Button>
          + Add Question
        </Button>
</Link>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">
                  ID
                </TableHead>

                <TableHead>
                  Question
                </TableHead>

                <TableHead>
                  Difficulty
                </TableHead>

                <TableHead>
                  Topic
                </TableHead>

                <TableHead>
                  Acceptance
                </TableHead>

                <TableHead>
                  Submissions
                </TableHead>

                <TableHead>
                  Status
                </TableHead>

                <TableHead>
                  Created
                </TableHead>

                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentQuestions.map((question) => (
                <TableRow
                  key={question.id}
                  className="hover:bg-muted/30"
                >
                  {/* ID */}
                  <TableCell>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {question.id}
                    </span>
                  </TableCell>

                  {/* Question */}
                  <TableCell>
                    <div className="max-w-[300px]">
                      <p className="truncate font-medium">
                        {question.title}
                      </p>
                    </div>
                  </TableCell>

                  {/* Difficulty */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        difficultyStyles[
                          question.difficulty
                        ]
                      }
                    >
                      {question.difficulty}
                    </Badge>
                  </TableCell>

                  {/* Topic */}
                  <TableCell>
                    <Badge variant="secondary">
                      {question.topic}
                    </Badge>
                  </TableCell>

                  {/* Acceptance */}
                  <TableCell>
                    <span className="font-medium">
                      {question.acceptance}
                    </span>
                  </TableCell>

                  {/* Submissions */}
                  <TableCell>
                    {question.submissions.toLocaleString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={
                        question.status === "Published"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {question.status}
                    </Badge>
                  </TableCell>

                  {/* Created */}
                  <TableCell className="text-sm text-muted-foreground">
                    {question.createdAt}
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
                questions.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {questions.length}
            </span>{" "}
            questions
          </p>

          <div className="flex items-center gap-1">
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

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
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

