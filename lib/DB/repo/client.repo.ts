import { Client } from "../../DB/entity/client.entity";
import {getRepository} from "typeorm";
export class ClientRepo {

    public static async findByHash(hash:string): Promise<Client>{
        const userRepository = getRepository(Client);
        return await userRepository.findOne({ where: { identifier:hash },relations:["clientStats"]})
    }

    public static async findById(id:number): Promise<Client>{
        const userRepository = getRepository(Client);
        return await userRepository.findOne(id,{relations:["clientStats"]});
    }

    public static async createOrUpdate(user: Client): Promise<Client>{
        const userRepository = getRepository(Client);
        return await userRepository.save(user);
    }
}