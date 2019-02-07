import { UserRepo } from "../DB/repo/user.repo";
import { ClientRepo } from "../DB/repo/client.repo";
import { Client } from "../DB/entity/client.entity";
var sha1 = require('sha1');

export class ClientService {
    public async addClient(client: Client): Promise<Client> {
        return await ClientRepo.create(client);
    }

    public async getClientByHashOrId(idOrHash: string | number): Promise<Client> {
        if(typeof idOrHash === "string")
            return ClientRepo.findByHash(idOrHash);
        else if(typeof idOrHash === "number")
            return ClientRepo.findById(idOrHash);
        return undefined;
    }
}