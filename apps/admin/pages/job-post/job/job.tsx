import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import type { AppDispatch } from "../../../store/store";
import { addJob, editJob, type Job } from "../../../reducers/jobReducer";
import type { JobPayload } from "../../../handlers/handler";

type JobEditorProps = { job?: Job | null; onClose: () => void };
const emptyForm: JobPayload = {
  title: "", role: "", tags: "", overview: "", selectionProcess: "", applicationProcess: "",
  organization: "", eligiblity: "", qualification: "", branch: "", experience: "", salary: "",
  location: "", applicationDate: "", applicationDeadline: "", interviewDate: "", applyLink: "",
};

const textAreas: Array<keyof JobPayload> = ["overview", "selectionProcess", "applicationProcess", "eligiblity"];
const labels: Record<keyof JobPayload, string> = {
  title: "Title", role: "Role", tags: "Tags", overview: "Overview", selectionProcess: "Selection process",
  applicationProcess: "Application process", organization: "Organization", eligiblity: "Eligibility",
  qualification: "Qualification", branch: "Branch", experience: "Experience", salary: "Salary",
  location: "Location", applicationDate: "Application date", applicationDeadline: "Application deadline",
  interviewDate: "Interview date", applyLink: "Application link",
};
const requiredFields: Array<keyof JobPayload> = ["title", "overview", "selectionProcess", "applicationProcess", "organization"];

export default function Job({ job, onClose }: JobEditorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<JobPayload>(emptyForm);

  useEffect(() => {
    if (job) {
      const { _id: _jobId, createdAt: _createdAt, updatedAt: _updatedAt, ...jobForm } = job;
      setForm(jobForm);
    } else setForm(emptyForm);
  }, [job]);

  const updateField = (field: keyof JobPayload, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await dispatch(job ? editJob({ ...form, ...job, id: job._id }) : addJob(form));
    if ((job ? editJob : addJob).fulfilled.match(result)) onClose();
  };

  const renderField = (field: keyof JobPayload) => (
    <div className="grid gap-2" key={field}>
      <Label htmlFor={`job-${field}`}>{labels[field]}</Label>
      {textAreas.includes(field) ? (
        <Textarea id={`job-${field}`} className={field === "overview" ? "min-h-32" : "min-h-24"} value={form[field]} onChange={(event) => updateField(field, event.target.value)} required={requiredFields.includes(field)} />
      ) : (
        <Input id={`job-${field}`} type={field === "applyLink" ? "url" : "text"} value={form[field]} onChange={(event) => updateField(field, event.target.value)} required={requiredFields.includes(field)} />
      )}
    </div>
  );

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b"><CardTitle>{job ? "Edit job post" : "Create a job post"}</CardTitle><Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close editor"><X /></Button></CardHeader>
      <CardContent className="pt-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <section className="grid gap-4"><h2 className="text-sm font-semibold">Job details</h2><div className="grid gap-4 md:grid-cols-2">{["title", "role", "organization", "tags", "location", "salary"].map((field) => renderField(field as keyof JobPayload))}</div></section>
          <section className="grid gap-4"><h2 className="text-sm font-semibold">Description</h2><div className="grid gap-4">{["overview", "selectionProcess", "applicationProcess", "eligiblity"].map((field) => renderField(field as keyof JobPayload))}</div></section>
          <section className="grid gap-4"><h2 className="text-sm font-semibold">Requirements and application</h2><div className="grid gap-4 md:grid-cols-2">{["qualification", "branch", "experience", "applicationDate", "applicationDeadline", "interviewDate", "applyLink"].map((field) => renderField(field as keyof JobPayload))}</div></section>
          <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit"><Save /> {job ? "Save changes" : "Create job"}</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
