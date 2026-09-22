import { useEffect, useState } from "react";
import { BriefcaseBusiness, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchJobs, removeJob, type Job } from "../../../reducers/jobReducer";
import JobEditor from "../job/job";

export default function JobsManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.jobs);
  const [editorJob, setEditorJob] = useState<Job | null | undefined>(undefined);

  useEffect(() => { void dispatch(fetchJobs()); }, [dispatch]);
  const handleDelete = async (job: Job) => { if (window.confirm(`Delete "${job.title}"?`)) await dispatch(removeJob(job._id)); };
  if (editorJob !== undefined) return <JobEditor job={editorJob} onClose={() => setEditorJob(undefined)} />;

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-start gap-3"><BriefcaseBusiness className="mt-1 size-5" /><div><CardTitle>Job posts</CardTitle><CardDescription className="mt-1">Create, edit, and manage opportunities.</CardDescription></div></div>
        <Button onClick={() => setEditorJob(null)}><Plus /> Create job</Button>
      </CardHeader>
      <CardContent className="pt-6">
        {error && <p className="mb-4 text-sm text-destructive" role="alert">{error}</p>}
        <div className="flex justify-end pb-3"><Button variant="outline" size="sm" onClick={() => void dispatch(fetchJobs())} disabled={loading}><RefreshCw className={loading ? "animate-spin" : ""} /> Refresh</Button></div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Position</TableHead><TableHead>Organization</TableHead><TableHead>Location</TableHead><TableHead>Deadline</TableHead><TableHead>Tags</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((job) => <TableRow key={job._id}><TableCell><div><p className="font-medium">{job.title}</p><p className="text-xs text-muted-foreground">{job.role || "Role not specified"}</p></div></TableCell><TableCell>{job.organization}</TableCell><TableCell>{job.location || "-"}</TableCell><TableCell className="text-muted-foreground">{job.applicationDeadline || "-"}</TableCell><TableCell><Badge variant="secondary">{job.tags || "General"}</Badge></TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => setEditorJob(job)} aria-label={`Edit ${job.title}`}><Pencil /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => void handleDelete(job)} aria-label={`Delete ${job.title}`}><Trash2 /></Button></div></TableCell></TableRow>)}
              {!loading && items.length === 0 && <TableRow><TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No job posts found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
