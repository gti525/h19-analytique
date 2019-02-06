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

    public static async findOSBySiteWebId(SiteWebId): Promise<Statistique[]>{
        const statistiqueRepo = getRepository(Statistique);
        return await statistiqueRepo.find({
            select: ['os'],
            where: {
                userId: SiteWebId
            },
          });
    }

    public static async findPaysBySiteWebId(SiteWebId): Promise<Statistique[]>{
        const statistiqueRepo = getRepository(Statistique);
        return await statistiqueRepo.find({
            select: ['pays'],
            where: {
                userId: SiteWebId
            },
          });
    }

    public static async findResolutionBySiteWebId(SiteWebId): Promise<Statistique[]>{
        const statistiqueRepo = getRepository(Statistique);
        return await statistiqueRepo.find({
            select: ['resolution'],
            where: {
                userId: SiteWebId
            },
          });
    }
}