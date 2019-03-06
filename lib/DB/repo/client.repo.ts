import { Client } from "../entity/client.entity";
import {getRepository} from "typeorm";
import { User } from "../entity/user.entitiy";
import { cpus } from "os";
export class ClientRepo {

    public static async findByHash(hash:string): Promise<Client>{
        const userRepository = getRepository(Client);
        return await userRepository.findOne({ where: { identifier:hash },relations:["clientStats"]})
    }

    public static async findById(id:number): Promise<Client>{
        const userRepository = getRepository(Client);
        return await userRepository.findOne(id,{relations:["clientStats"]});
    }

    public static async findAll(user:User): Promise<Client[]>{
        const userRepository = getRepository(Client);
        console.log(await userRepository.createQueryBuilder("client")
        .leftJoin("client.clientStats","clientStatistic")
        .leftJoin("clientStatistic.banner","banner")
        .leftJoin("banner.campaigns","campaigns")
        .where(`campaigns.userId = :id`, {id: user.id})
        .getMany())
        return await userRepository.createQueryBuilder("client")
        .leftJoin("client.clientStats","clientStatistic")
        .leftJoin("clientStatistic.banner","banner")
        .leftJoin("banner.campaigns","campaigns")
        .where(`campaigns.userId = :id`, {id: user.id})
        .getMany();
    }

    public static async createOrUpdate(user: Client): Promise<Client>{
        const userRepository = getRepository(Client);
        return await userRepository.save(user);
    }
}