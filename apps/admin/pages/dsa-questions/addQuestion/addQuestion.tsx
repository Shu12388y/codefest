import { useState } from "react";
import { CalendarIcon, Plus, X, Save } from "lucide-react";

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

export default function CreateDSAQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>(["Arrays", "Hashing"]);
  const [tagInput, setTagInput] = useState("");

  const [scheduleDate, setScheduleDate] = useState<Date>();

  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState("");

  const [hiddenInput, setHiddenInput] = useState("");
  const [hiddenOutput, setHiddenOutput] = useState("");

  const addTag = () => {
    const tag = tagInput.trim();

    if (!tag || tags.includes(tag)) return;

    setTags([...tags, tag]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((item) => item !== tag));
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create DSA Question
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create a coding problem with test cases and scheduling configuration.
        </p>
      </div>

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
                  onChange={(e) => setTitle(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
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
                    onChange={(e) => setTestInput(e.target.value)}
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
                    onChange={(e) => setTestOutput(e.target.value)}
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
                    onChange={(e) => setHiddenInput(e.target.value)}
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
                    onChange={(e) => setHiddenOutput(e.target.value)}
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
              <Button className="w-full" size="lg" type="button">
                <Save className="mr-2 h-4 w-4" />
                Create Question
              </Button>

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
