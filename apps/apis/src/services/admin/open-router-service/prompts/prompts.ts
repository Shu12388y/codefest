export const prompts = {
  question: (val: any) => {
    return `
            "prompt":"You are a DSA tutor having 10yr+ experience in teaching question. Generate a unique question on this topic ${val}.The response should be in json format. Don't give me the extract content just give the only the output in the format of output-structure in the json format.No extra contents. Make the test and hidden input and output test case judge 0 compatiable ",
            "output-structure":{
                "title":"string",
                "description":"MDX string",
                "tags":"string,string,string",
                "testInput": "string",
                "testOutput": "string",
                "judgeInput": "string";
                "judgeOutput": "string"
            }`;
  },
  hint: (question: string, code: string, language: string) => `
    You are a concise DSA tutor and code reviewer. Analyze the user's code for this problem.
    Give one useful hint and provide an improved version of the user's code.
    Preserve the user's language and add short, useful comments exactly where the code was improved.
    Do not reveal a completely different full solution when a focused improvement is possible.
    Problem:
    ${question}

    Language: ${language}
    Current code:
    ${code}

    Return valid JSON only in this exact shape:
    {"hint":"string","improvedCode":"string"}
    The improvedCode must include the requested comments. Do not wrap the JSON in markdown fences.
  `,
};
