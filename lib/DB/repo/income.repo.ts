import { getRepository } from "typeorm";
import { Income } from "../entity/income.entitiy";
export class IncomeRepo {

    public static async findByUsername(user:string): Promise<Income>{
        const incomeRepository = getRepository(Income);
        return await incomeRepository.findOne({ where: { username: user }});
    }

    public static async create(income:Income){
        const incomeRepository = getRepository(Income);
        return await incomeRepository.save(income);
    }

}
