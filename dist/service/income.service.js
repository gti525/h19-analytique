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
const income_entitiy_1 = require("../DB/entity/income.entitiy");
class IncomeService {
    getIncomeByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // NOT IMPLEMENTED YET
            console.log("NOT IMPLEMENTED YET");
            const income = new income_entitiy_1.Income();
            income.regularClicks = Math.floor(Math.random() * 100) + 20;
            income.regularViews = Math.floor(Math.random() * 100) + 20;
            income.targetedClicks = Math.floor(Math.random() * 100) + 20;
            income.targetedViews = Math.floor(Math.random() * 100) + 20;
            income.cashedRegularClicks = Math.floor(Math.random() * 20);
            income.cashedRegularViews = Math.floor(Math.random() * 20);
            income.cashedTargetedClicks = Math.floor(Math.random() * 20);
            income.cashedTargetedViews = Math.floor(Math.random() * 20);
            return income;
        });
    }
}
exports.IncomeService = IncomeService;
//# sourceMappingURL=income.service.js.map