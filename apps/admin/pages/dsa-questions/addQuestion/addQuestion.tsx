import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarIcon, X, Save, Sparkles } from "lucide-react";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Input } from "../../../components/ui/input";

import { Label } from "../../../components/ui/label";

import { Textarea } from "../../../components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import { Calendar } from "../../../components/ui/calendar";

import { Badge } from "../../../components/ui/badge";

import { cn } from "../../../lib/utils";
import { generateQuestion } from "../../../handlers/handler";
import type { AppDispatch, RootState } from "../../../store/store";
import {
  addQuestion,
  editQuestion,
  loadQuestion,
  resetQuestionDraft,
  setQuestionDraft,
} from "../../../reducers/questionReducer";
import { useNavigate, useSearchParams } from "react-router";

type GeneratedQuestion = {
  title?: string;
  description?: string;
  tags?: string | string[];
  testInput?: string;
  testOutput?: string;
  judgeInput?: string;
  judgeOutput?: string;
};

function parseGeneratedQuestion(value: string): GeneratedQuestion {
  const json = value.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(json) as GeneratedQuestion;
}

export default function CreateDSAQuestion() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { draft, loading, error, created } = useSelector((state: RootState) => state.questions);
  const { title, description, tags: tagList, testInput, testOutput, judgeInput: hiddenInput, judgeOutput: hiddenOutput } = draft;
  const tags = tagList ? tagList.split(",").map((tag) => tag.trim()).filter(Boolean) : [];
  const [tagInput, setTagInput] = useState("");

  const [scheduleDate, setScheduleDate] = useState<Date>();

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  useEffect(() => {
    if (editId) {
      void dispatch(loadQuestion(editId));
    } else {
      dispatch(resetQuestionDraft());
    }
  }, [dispatch, editId]);

  const fillGeneratedQuestion = async () => {
    if (!topic.trim()) {
      setGenerationError("Enter a topic first.");
      return;
    }

    setIsGenerating(true);
    setGenerationError("");

    try {
      const response = await generateQuestion(topic.trim());
      if (!response.data) throw new Error("The AI service returned no question.");

      const question = parseGeneratedQuestion(response.data);
      dispatch(setQuestionDraft({
        title: question.title || "",
        description: question.description || "",
        tags: Array.isArray(question.tags) ? question.tags.join(", ") : question.tags || "",
        testInput: question.testInput || "",
        testOutput: question.testOutput || "",
        judgeInput: question.judgeInput || "",
        judgeOutput: question.judgeOutput || "",
      }));
      setTagInput("");
      setIsGeneratorOpen(false);
      setTopic("");
    } catch {
      setGenerationError("Could not generate a question. Check the API and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag || tags.includes(tag)) return;

    dispatch(setQuestionDraft({ tags: [...tags, tag].join(", ") }));
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    dispatch(setQuestionDraft({ tags: tags.filter((item) => item !== tag).join(", ") }));
  };

  const submitQuestion = async () => {
    const result = editId
      ? await dispatch(editQuestion({ ...draft, id: editId }))
      : await dispatch(addQuestion(draft));

    if (result.meta.requestStatus === "fulfilled") navigate("/questions");
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {editId ? "Edit DSA Question" : "Create DSA Question"}
          </h1>

          <Button type="button" onClick={() => setIsGeneratorOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate with AI
          </Button>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a coding problem with test cases and scheduling configuration.
        </p>
      </div>

      {isGeneratorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="generate-question-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isGenerating) setIsGeneratorOpen(false);
          }}
        >
          <Card className="w-full max-w-md rounded-2xl shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle id="generate-question-title">Generate a question</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter a DSA topic and AI will fill the form for you.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close generator"
                  disabled={isGenerating}
                  onClick={() => setIsGeneratorOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-topic">Topic</Label>
                <Input
                  id="question-topic"
                  autoFocus
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") void fillGeneratedQuestion();
                  }}
                  placeholder="e.g. Sliding Window"
                  disabled={isGenerating}
                />
              </div>
              {generationError && <p className="text-sm text-destructive">{generationError}</p>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" disabled={isGenerating} onClick={() => setIsGeneratorOpen(false)}>
                  Cancel
                </Button>
                <Button type="button" disabled={isGenerating} onClick={() => void fillGeneratedQuestion()}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Question Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>

                <Input
                  id="title"
                  placeholder="e.g. Maximum Subarray Sum"
                  value={title}
                  onChange={(e) => dispatch(setQuestionDraft({ title: e.target.value }))}
                />
              </div>

              {/* MDX Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>

                  <Badge variant="secondary" className="text-xs">
                    MDX
                  </Badge>
                </div>

                <div className="overflow-hidden rounded-xl border">
                  {/* Editor Toolbar */}
                  <div className="flex items-center gap-1 border-b bg-muted/40 p-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="font-bold"
                    >
                      B
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="italic"
                    >
                      I
                    </Button>

                    <Button type="button" variant="ghost" size="sm">
                      H2
                    </Button>

                    <Button type="button" variant="ghost" size="sm">
                      Code
                    </Button>

                    <Button type="button" variant="ghost" size="sm">
                      Link
                    </Button>

                    <Button type="button" variant="ghost" size="sm">
                      List
                    </Button>
                  </div>

                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => dispatch(setQuestionDraft({ description: e.target.value }))}
                    placeholder={`## Problem

Given an array of integers, find the maximum
possible sum of a contiguous subarray.

### Example

Input:

[-2,1,-3,4,-1,2,1,-5,4]

Output:
6`}
                    className="min-h-105 resize-none rounded-none border-0 p-4 font-mono text-sm shadow-none focus-visible:ring-0"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Supports Markdown, code blocks and MDX components.
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>

                <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border px-3 py-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}

                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 rounded-full outline-none hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder={tags.length ? "Add tag..." : "e.g. Arrays"}
                    className="min-w-[120px] flex-1 bg-transparent text-sm outline-none"
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Press Enter or comma to add a tag.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Public Test Cases */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Public Test Cases</CardTitle>

              <p className="text-sm text-muted-foreground">
                Test cases visible to users.
              </p>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Input */}
                <div className="space-y-2">
                  <Label>Test Input</Label>

                  <Textarea
                    value={testInput}
                    onChange={(e) => dispatch(setQuestionDraft({ testInput: e.target.value }))}
                    placeholder={`5
1 2 3 4 5`}
                    className="min-h-[220px] resize-none font-mono text-sm"
                  />
                </div>

                {/* Output */}
                <div className="space-y-2">
                  <Label>Expected Output</Label>

                  <Textarea
                    value={testOutput}
                    onChange={(e) => dispatch(setQuestionDraft({ testOutput: e.target.value }))}
                    placeholder={`15`}
                    className="min-h-[220px] resize-none font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hidden Test Cases */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Hidden Test Cases</CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Used by the judge but never shown to users.
                  </p>
                </div>

                <Badge variant="destructive">Hidden</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Hidden Input */}
                <div className="space-y-2">
                  <Label>Hidden Input</Label>

                  <Textarea
                    value={hiddenInput}
                    onChange={(e) => dispatch(setQuestionDraft({ judgeInput: e.target.value }))}
                    placeholder={`100000
1 4 2 8 5 ...`}
                    className="min-h-[240px] resize-none font-mono text-sm"
                  />
                </div>

                {/* Hidden Output */}
                <div className="space-y-2">
                  <Label>Hidden Output</Label>

                  <Textarea
                    value={hiddenOutput}
                    onChange={(e) => dispatch(setQuestionDraft({ judgeOutput: e.target.value }))}
                    placeholder={`999999`}
                    className="min-h-[240px] resize-none font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Schedule */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Schedule</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Publish Date</Label>

                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !scheduleDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {scheduleDate
                        ? scheduleDate.toLocaleDateString()
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  The question will become available to users on the selected
                  date.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Question Preview */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">TITLE</p>

                <p className="mt-1 font-medium">
                  {title || "Untitled Question"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">TAGS</p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.length > 0 ? (
                    tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No tags
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">PUBLISH DATE</p>

                <p className="mt-1 text-sm">
                  {scheduleDate
                    ? scheduleDate.toLocaleDateString()
                    : "Not scheduled"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card className="rounded-2xl">
            <CardContent className="p-5">
              <Button className="w-full" size="lg" type="button" disabled={loading} onClick={() => void submitQuestion()}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? (editId ? "Saving..." : "Creating...") : (editId ? "Save Changes" : "Create Question")}
              </Button>

              {error && <p className="mt-3 text-center text-sm text-destructive">{error}</p>}
              {created && <p className="mt-3 text-center text-sm text-emerald-600">Question created successfully.</p>}

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Make sure all test cases are correct before publishing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
