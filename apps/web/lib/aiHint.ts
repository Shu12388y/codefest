import type { WorkspaceLanguage } from "@/store/workspaceReducer";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

type HintPayload = {
  question: string;
  code: string;
  language: WorkspaceLanguage;
};

export type AiHintResult = {
  hint: string;
  improvedCode: string;
};

export async function fetchAiHint(payload: HintPayload): Promise<AiHintResult> {
  const response = await fetch(`${API_URL}/api/v1/admin/hint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Unable to generate a hint.");

  const result = (await response.json()) as { data?: AiHintResult };
  if (!result.data?.hint || !result.data.improvedCode) throw new Error("The AI service returned no hint.");
  return result.data;
}
