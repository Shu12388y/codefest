export type DsaQuestion = {
  _id: string;
  title: string;
  description: string;
  tags: string;
  testInput: string;
  testOutput: string;
  judgeInput: string;
  judgeOutput: string;
};

export const sampleDsaQuestions: DsaQuestion[] = [
  {
    _id: "sample-two-sum",
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution.",
    tags: "Array, Hash Table",
    testInput: "nums = [2, 7, 11, 15], target = 9",
    testOutput: "[0, 1]",
    judgeInput: "4\n2 7 11 15\n9",
    judgeOutput: "0 1",
  },
  {
    _id: "sample-valid-parentheses",
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid when every opening bracket is closed by the same type of bracket in the correct order.",
    tags: "String, Stack",
    testInput: "s = \"()[]{}\"",
    testOutput: "true",
    judgeInput: "()[]{}",
    judgeOutput: "true",
  },
  {
    _id: "sample-best-time-stock",
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Choose a single day to buy one stock and a different day in the future to sell that stock. Return the maximum profit.",
    tags: "Array, Dynamic Programming",
    testInput: "prices = [7, 1, 5, 3, 6, 4]",
    testOutput: "5",
    judgeInput: "6\n7 1 5 3 6 4",
    judgeOutput: "5",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getDsaQuestions(): Promise<DsaQuestion[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/admin/questions`, {
      cache: "no-store",
    });

    if (!response.ok) return sampleDsaQuestions;

    const result = (await response.json()) as { data?: DsaQuestion[] };
    return result.data?.length ? result.data : sampleDsaQuestions;
  } catch {
    return sampleDsaQuestions;
  }
}