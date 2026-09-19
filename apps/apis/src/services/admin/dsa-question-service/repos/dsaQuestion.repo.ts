import { ResponseHelper } from "../../../../helpers/Response.js";
import { DsaQuestion } from "../../../../schema/dsa-questions/dsaQuestion.model.js";

export class DSAQuestionRepo {
    private title: string;
    private description: string;
    private tags: string;
    private testInput: string;
    private testOutput: string;
    private judgeInput: string;
    private judgeOutput: string;

    constructor(
        title: string,
        description: string,
        tags: string,
        testInput: string,
        testOutput: string,
        judgeInput: string,
        judgeOutput: string,
    ) {
        this.title = title;
        this.description = description;
        this.tags = tags;
        this.testInput = testInput;
        this.testOutput = testOutput;
        this.judgeInput = judgeInput;
        this.judgeOutput = judgeOutput;
    }

    public async create() {
        try {
            const question = new DsaQuestion({
                title: this.title,
                description: this.description,
                tags: this.tags,
                testInput: this.testInput,
                testOutput: this.testOutput,
                judgeInput: this.judgeInput,
                judgeOutput: this.judgeOutput,
            });
            const data = await question.save();
            const response = new ResponseHelper(1, "created", data);
            return response.response();
        } catch (error) {
            const response = new ResponseHelper(-1, String(error));
            return response.response();
        }
    }

    public static async findAll() {
        try {
            const data = await DsaQuestion.find().sort({ createdAt: -1 });
            const response = new ResponseHelper(1, "Found", data);
            return response.response();
        } catch (error) {
            const response = new ResponseHelper(-1, String(error));
            return response.response();
        }
    }

    public static async find(title: string) {
        try {
            const data = await DsaQuestion.findOne({ title });

            if (!data) {
                const response = new ResponseHelper(-1, "DSA question not exists");
                return response.response();
            }

            const response = new ResponseHelper(1, "Found", data);
            return response.response();
        } catch (error) {
            const response = new ResponseHelper(-1, String(error));
            return response.response();
        }
    }

    public async update(_id: string) {
        try {
            const data = await DsaQuestion.findByIdAndUpdate(
                _id,
                {
                    title: this.title,
                    description: this.description,
                    tags: this.tags,
                    testInput: this.testInput,
                    testOutput: this.testOutput,
                    judgeInput: this.judgeInput,
                    judgeOutput: this.judgeOutput,
                },
                { new: true, runValidators: true },
            );

            if (!data) {
                const response = new ResponseHelper(-1, "DSA question not exists");
                return response.response();
            }

            const response = new ResponseHelper(1, "Updated", data);
            return response.response();
        } catch (error) {
            const response = new ResponseHelper(-1, String(error));
            return response.response();
        }
    }

    public static async delete(_id: string) {
        try {
            const data = await DsaQuestion.findByIdAndDelete(_id);

            if (!data) {
                const response = new ResponseHelper(-1, "DSA question not exists");
                return response.response();
            }

            const response = new ResponseHelper(1, "Deleted", data);
            return response.response();
        } catch (error) {
            const response = new ResponseHelper(-1, String(error));
            return response.response();
    }
    }
}