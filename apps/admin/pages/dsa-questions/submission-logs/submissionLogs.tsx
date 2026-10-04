import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchSubmissions } from "../../../reducers/submissionReducer";

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

const statusConfig = {
  Accepted: {
    icon: CheckCircle2,
    className:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400",
  },
  "Wrong Answer": {
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400",
  },
  "Time Limit": {
    icon: Clock3,
    className:
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-400",
  },
  "Runtime Error": {
    icon: XCircle,
    className:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-400",
  },
  QUEUE: {
    icon: Clock3,
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400",
  },
};

const ITEMS_PER_PAGE = 5;

export default function SubmissionLogs() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: submissions, loading, error } = useSelector(
    (state: RootState) => state.submissions,
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    void dispatch(fetchSubmissions());
  }, [dispatch]);

  const totalPages = Math.ceil(
    submissions.length / ITEMS_PER_PAGE
  );

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentSubmissions = submissions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">
            Submission Logs
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor recent code submissions and execution results.
          </p>
        </div>

        <Badge variant="secondary">
          {submissions.length} submissions
        </Badge>
      </CardHeader>

      <CardContent>
        {/* Table */}
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[130px]">
                  Submission ID
                </TableHead>

                <TableHead>User</TableHead>

                <TableHead>Problem</TableHead>

                <TableHead>Language</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Runtime</TableHead>

                <TableHead>Submitted</TableHead>

                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    Loading submissions...
                  </TableCell>
                </TableRow>
              ) : currentSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                    {error || "No submissions found."}
                  </TableCell>
                </TableRow>
              ) : currentSubmissions.map((submission) => {
                const status = statusConfig[submission.status as keyof typeof statusConfig] || statusConfig.QUEUE;
                const StatusIcon = status.icon;

                return (
                  <TableRow
                    key={submission._id}
                    className="hover:bg-muted/30"
                  >
                    {/* ID */}
                    <TableCell>
                      <span className="font-mono text-xs font-medium">
                        {submission._id}
                      </span>
                    </TableCell>

                    {/* User */}
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {submission.userId}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {submission._id}
                        </p>
                      </div>
                    </TableCell>

                    {/* Problem */}
                    <TableCell>
                      <span className="font-medium">
                        Not available
                      </span>
                    </TableCell>

                    {/* Language */}
                    <TableCell>
                      <Badge variant="outline">
                        {submission.language}
                      </Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`gap-1.5 ${status.className}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {submission.status}
                      </Badge>
                    </TableCell>

                    {/* Runtime */}
                    <TableCell className="font-mono text-sm">
                      -
                    </TableCell>

                    {/* Time */}
                    <TableCell className="text-sm text-muted-foreground">
                      {submission.createdAt ? new Date(submission.createdAt).toLocaleString() : "-"}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {submissions.length ? startIndex + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                submissions.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {submissions.length}
            </span>
          </p>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => Math.max(prev - 1, 1))
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
                  page === pageNumber ? "default" : "outline"
                }
                size="sm"
                className="h-9 w-9"
                onClick={() => setPage(pageNumber)}
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

