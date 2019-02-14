import { ClientRepo } from "../DB/repo/client.repo";
import { Client } from "../DB/entity/client.entity";
var sha1 = require('sha1');

export class ClientService {
    public async addClient(client: Client): Promise<Client> {
        return await ClientRepo.createOrUpdate(client);
    }

    public async updateClient(client: Client): Promise<Client> {
        return await ClientRepo.createOrUpdate(client);
    }

    public async getClientByHashOrId(idOrHash: string | number): Promise<Client> {
        if(typeof idOrHash === "string")
            return await ClientRepo.findByHash(idOrHash);
        else if(typeof idOrHash === "number")
            return await ClientRepo.findById(idOrHash);
        return undefined;
    }
}