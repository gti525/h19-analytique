"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exam_service_1 = require("../service/exam.service");
class ExamController {
    constructor() {
        this.examService = new exam_service_1.ExamService();
        // public updateContact (req: Request, res: Response) {           
        //     Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
        //         if(err){
        //             res.send(err);
        //         }
        //         res.json(contact);
        //     });
        // }
        // public deleteContact (req: Request, res: Response) {           
        //     Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        //         if(err){
        //             res.send(err);
        //         }
        //         res.json({ message: 'Successfully deleted contact!'});
        //     });
        // }
    }
    async addExam(req, res) {
        const exam = await this.examService.addExam(req.body);
        res.json(exam).status(201);
    }
    // public getContacts (req: Request, res: Response) {           
    //     Contact.find({}, (err, contact) => {
    //         if(err){
    //             res.send(err);
    //         }
    //         res.json(contact);
    //     });
    // }
    async getExamById(req, res) {
        console.log(this);
        const exam = await this.examService.findExamById(req.params.id);
        res.json(exam);
    }
}
exports.ExamController = ExamController;
//# sourceMappingURL=ExamController.js.map