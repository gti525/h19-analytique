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
const income_service_1 = require("../service/income.service");
const incomechart_enum_1 = require("../models/enums/incomechart-enum");
class IncomeController {
    constructor() {
        this.incomeService = new income_service_1.IncomeService();
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO trouver le id du user actuel
            const userId = 10;
            // TODO si income n'existe pas, retourner la page 404
            const income = yield this.incomeService.getIncomeByUserId(userId);
            res.render('income/index', { income: income, incomeChart: incomechart_enum_1.IncomeChart });
        });
    }
}
exports.IncomeController = IncomeController;
//# sourceMappingURL=incomeController.js.map