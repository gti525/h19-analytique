import { Statistique } from "../DB/entity/statistique.entitiy";
import { StatistiqueRepo } from "../DB/repo/statistique.repo";

export class StatistiqueService {


    public async getOSBySiteWebId(id: number): Promise<Statistique[]> {
        return await StatistiqueRepo.findOSBySiteWebId(id);
    }

    public async getResolutionBySiteWebId(id: number): Promise<Statistique[]> {
        return await StatistiqueRepo.findResolutionBySiteWebId(id);
    }

    public async getPaysBySiteWebId(id: number): Promise<Statistique[]> {
        return await StatistiqueRepo.findPaysBySiteWebId(id);
    }
}