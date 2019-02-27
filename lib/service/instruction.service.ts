import {InstructionRepo} from "../DB/repo/instruction.repo";
import { User } from "DB/entity/user.entitiy";

export class InstructionService {
    instructionRepo: InstructionRepo  = new InstructionRepo();
    public getInstructions(user: User): any {
        return this.instructionRepo.findAll(user);
    }
}