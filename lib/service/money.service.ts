import { Money } from "../DB/entity/money.entitiy";
import { MoneyRepo } from "../DB/repo/money.repo";

export class MoneyService {

    public async getProfileuser(user: string): Promise<Money> {
        return await MoneyRepo.findByUsername(user);
    }


    public async addMoneyUser(money: Money): Promise<Money> {
        return await MoneyRepo.create(money);
    }


    public async deleteMoneyUser(user:string): Promise<void>{
        return await MoneyRepo.delete(user);
    }
}