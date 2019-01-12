"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.QuestionSchema = new Schema({
    Title: {
        type: String
    },
    Group: {
        type: String,
        required: 'The group is mandatory'
    },
    QuestionText: {
        type: String,
        required: 'QuestionTexts are mandatory'
    },
    CorrectAnswer: {
        type: String,
        required: 'CorrectAnswers are mandatory'
    },
    MaxScore: {
        type: Number,
        required: 'CorrectAnswers are mandatory'
    },
    IsSubQuestion: Boolean,
    IsBonus: Boolean
});
exports.MarkedQuestionSchema = new Schema({
    Question: {
        type: exports.QuestionSchema,
        required: 'A marked question needs to be linked to a question'
    },
    StudentAnswer: String,
    AwardedScore: Number,
});
exports.MarkedExamSchema = new Schema({
    StudentScore: Number,
    StudentId: String,
    MarquedQuestions: [exports.MarkedQuestionSchema]
});
exports.ExamSchema = new Schema({
    Name: String,
    Questions: [exports.QuestionSchema]
});
//# sourceMappingURL=ExamSchemas.js.map