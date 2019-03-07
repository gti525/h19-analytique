"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const income_entitiy_1 = require("../entity/income.entitiy");
class IncomeRepo {
    static findByUsername(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const incomeRepository = typeorm_1.getRepository(income_entitiy_1.Income);
            return yield incomeRepository.findOne({ where: { username: user } });
        });
    }
    static create(income) {
        return __awaiter(this, void 0, void 0, function* () {
            const incomeRepository = typeorm_1.getRepository(income_entitiy_1.Income);
            return yield incomeRepository.save(income);
        });
    }
    static createOrUpdate(income) {
        return __awaiter(this, void 0, void 0, function* () {
            const incomeRepository = typeorm_1.getRepository(income_entitiy_1.Income);
            return yield incomeRepository.save(income);
        });
    }
}
exports.IncomeRepo = IncomeRepo;
//# sourceMappingURL=income.repo.js.map