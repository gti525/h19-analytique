import {getRepository} from "typeorm";
import { Statistique } from "../entity/statistique.entitiy";
export class StatistiqueRepo {

    public static async findById(id:number): Promise<Statistique>{
        const statistiqueRepo = getRepository(Statistique);
        return await statistiqueRepo.findOne(id);
    }

    public static async findAll(): Promise<Statistique[]>{
        const statistiqueRepo = getRepository(Statistique);
        return await statistiqueRepo.find();
    }
}