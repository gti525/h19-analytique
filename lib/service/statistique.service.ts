import { ClientRepo } from "../DB/repo/client.repo";
import { Client } from "../DB/entity/client.entity";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { User } from "../DB/entity/user.entitiy";
import { ClientStatisticRepo } from "../DB/repo/stats.repo";

export class StatistiqueService {
    public async getClients(user: User): Promise<Client[]> {
        return await ClientRepo.findAll(user);
    }
}