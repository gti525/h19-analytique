import {getRepository} from "typeorm";
import { Client } from "../entity/client.entity";
export class StatistiqueRepo {


    public static async findOSBySiteWebId(SiteWebId): Promise<Client[]>{
        const statistiqueRepo = getRepository(Client);
        return await statistiqueRepo.find({
            select: ['os'],
            where: {
                userId: SiteWebId
            },
          });
    }

    public static async findPaysBySiteWebId(SiteWebId): Promise<Client[]>{
        const statistiqueRepo = getRepository(Client);
        return await statistiqueRepo.find({
            select: ['country'],
            where: {
                userId: SiteWebId
            },
          });
    }

    public static async findResolutionBySiteWebId(SiteWebId): Promise<Client[]>{
        const statistiqueRepo = getRepository(Client);
        return await statistiqueRepo.find({
            select: ['resolution'],
            where: {
                userId: SiteWebId
            },
          });
    }

    public static async findBrowserBySiteWebId(SiteWebId): Promise<Client[]>{
        const statistiqueRepo = getRepository(Client);
        return await statistiqueRepo.find({
            select: ['browser'],
            where: {
                userId: SiteWebId
            },
          });
    }
}