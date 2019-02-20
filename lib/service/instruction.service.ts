import {Instruction} from "../DB/entity/instruction.entitiy";
import {InstructionRepo} from "../DB/repo/instruction.repo";

export class InstructionService {
    public async getInstructions(): Promise<Instruction[]> {
        return await InstructionRepo.findAll();
    }

    public async getInstructionById(id: number): Promise<Instruction> {
        return await InstructionRepo.findById(id);
    }

}