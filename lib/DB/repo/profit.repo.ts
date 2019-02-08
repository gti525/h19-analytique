import {getRepository} from "typeorm";
import { Money } from "../entity/money.entitiy";
export class MoneyRepo {

    public static async findByUsername(user:string): Promise<Money>{
        const moneyRepository = getRepository(Money);
        return await moneyRepository.findOne({ where: { username: user }});
    }


    public static async create(money:Money){
        const moneyRepository = getRepository(Money);
        return await moneyRepository.save(money);
    }
    public static async delete(user:string){
        const moneyRepository = getRepository(Money);
        const moneyToDelete  = await MoneyRepo.findByUsername(user);
        if (moneyToDelete)
            await moneyRepository.delete(moneyToDelete);
    }
}
