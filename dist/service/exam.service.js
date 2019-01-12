"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exam_repo_1 = require("../DB/repo/exam.repo");
class ExamService {
    async findExamById(id) {
        return await exam_repo_1.ExamRepo.findExamById(id);
    }
    async addQuestion(examId, question) {
        const exam = await this.findExamById(examId);
        exam.Questions.push(question);
        exam_repo_1.ExamRepo.addExam(exam);
        return await exam_repo_1.ExamRepo.updateExam(exam).then(exam => exam.Questions.find(q => question.Title === q.Title && question.QuestionText === q.QuestionText));
    }
    async addExam(exam) {
        return await exam_repo_1.ExamRepo.addExam(exam);
    }
}
exports.ExamService = ExamService;
//# sourceMappingURL=exam.service.js.map