"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_repo_1 = require("../DB/repo/instruction.repo");
class InstructionService {
    constructor() {
        this.instructionRepo = new instruction_repo_1.InstructionRepo();
    }
    getInstructions(user) {
        return this.instructionRepo.findAll(user);
    }
}
exports.InstructionService = InstructionService;
//# sourceMappingURL=instruction.service.js.map