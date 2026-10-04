import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Link, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchQuestions, removeQuestion } from "../../../reducers/questionReducer";

const ITEMS_PER_PAGE = 5;

const formatDate = (date?: string) =>
  date ? new Date(date).toLocaleDateString() : "-";

export default function DSAQuestions() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: questions, loading, error } = useSelector((state: RootState) => state.questions);
  const [page, setPage] = useState(1);

  useEffect(() => {
    void dispatch(fetchQuestions());
  }, [dispatch]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await dispatch(removeQuestion(id));
  };

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
                  Tags
                </TableHead>

                <TableHead>
                  Public cases
                </TableHead>

                <TableHead>
                  Hidden cases
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    Loading questions...
                  </TableCell>
                </TableRow>
              ) : currentQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    {error || "No questions found."}
                  </TableCell>
                </TableRow>
              ) : currentQuestions.map((question) => (
                <TableRow
                  key={question._id}
                  className="hover:bg-muted/30"
                >
                  {/* ID */}
                  <TableCell>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {question._id}
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

                  {/* Tags */}
                  <TableCell>
                    <Badge variant="secondary">
                      {question.tags || "No tags"}
                    </Badge>
                  </TableCell>

                  {/* Public test cases */}
                  <TableCell>
                    <Badge variant="outline">Ready</Badge>
                  </TableCell>

                  {/* Hidden test cases */}
                  <TableCell>
                    <Badge variant="outline">Ready</Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge>Created</Badge>
                  </TableCell>

                  {/* Created */}
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(question.createdAt)}
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

                        <DropdownMenuItem onClick={() => navigate(`/add-question?edit=${encodeURIComponent(question._id)}`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive" onClick={() => void handleDelete(question._id, question.title)}>
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
              {questions.length ? startIndex + 1 : 0}
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

