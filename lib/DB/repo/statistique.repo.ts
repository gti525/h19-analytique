import {getRepository} from "typeorm";
import { Statistique } from "../entity/statistique.entitiy";
export class StatistiqueRepo {

    public static async findById(id:number): Promise<Statistique>{
        const StatistiqueRepo = getRepository(Statistique);
        return await StatistiqueRepo.findOne(id);
    }
}