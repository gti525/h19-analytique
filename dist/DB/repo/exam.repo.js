"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ExamSchemas_1 = require("../Schemas/ExamSchemas");
class ExamRepo {
    static addExam(exam) {
        return Exam.create(exam).then(e => e.toObject());
    }
    static updateExam(exam) {
        return Exam.findOneAndUpdate(exam.id, exam, { new: true }).then(e => e.toObject());
    }
    static async findExamById(id) {
        return await Exam.findById(id).then(e => e.toObject());
    }
}
exports.ExamRepo = ExamRepo;
const Exam = mongoose.model('Exam', ExamSchemas_1.ExamSchema, 'Exams');
//# sourceMappingURL=exam.repo.js.map