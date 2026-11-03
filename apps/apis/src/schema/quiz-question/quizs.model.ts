import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    option:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const quizQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    subtopic:{
        type:String,
        required:true
    },
    options:{
        type:optionSchema,
        required:true
    },
    correctAnswer:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:["EASY", "MEDIUM", "HARD", "SUPERHARD"],
        default:"EASY"
    },
    upvote:{
        type:String,
        default:"0"
    },
    downvote:{
        type:String,
        default:"0"
    },
    evalsScore:{
        type:String,
        default:"0"
    }
},{
    timestamps:true
});


export const QuizQuestion = mongoose.models.quizquestions ||  mongoose.model("quizquestion",quizQuestionSchema);