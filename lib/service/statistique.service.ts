import { ClientRepo } from "../DB/repo/client.repo";
import { Client } from "../DB/entity/client.entity";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { User } from "../DB/entity/user.entitiy";
import { ClientStatisticRepo } from "../DB/repo/stats.repo";

export class StatistiqueService {
    public async getClients(user: User): Promise<Client[]> {
        const clients = await ClientRepo.findAll();
        let banners = [];
        (await CampaignRepo.findByUser(user)).map((c) => {
            banners = banners.concat(c.banners);
        })
        const validClients: Client[] = await Promise.all(
            clients.map(async (client): Promise<Client>  => {
                for (const banner of banners) {
                    if (await ClientStatisticRepo.clientSawBanner(banner, client))
                        return client;
                }
            })
        )
        console.log(validClients.filter(vc => vc))
        return validClients;
    }
}