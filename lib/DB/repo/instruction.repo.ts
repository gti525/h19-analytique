import {getRepository} from "typeorm";
import {Instruction} from "../entity/instruction.entitiy";

export class InstructionRepo {

    public static async findById(id: number): Promise<Instruction> {
        const instructionRepo = getRepository(Instruction);
        return await instructionRepo.findOne(id);
    }

    public static async findAll(): Promise<Instruction[]> {
        const instructionRepo = getRepository(Instruction);
        return await instructionRepo.find();
    }


    public static async getAll(): Promise<Instruction[]> {
        const instructionRepo = getRepository(Instruction);
        return await instructionRepo.find({relations: ["websiteurls"]});

    }
}