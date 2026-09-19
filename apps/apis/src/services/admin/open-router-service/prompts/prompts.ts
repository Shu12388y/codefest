export const prompts = {
  question: (val: any) => {
    return `
            "prompt":"You are a DSA tutor having 10yr+ experience in teaching question. Generate a unique question on this topic ${val}.The response should be in json format. Don't give me the extract content just give the only the output in the format of output-structure in the json format.No extra contents ",
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
};
