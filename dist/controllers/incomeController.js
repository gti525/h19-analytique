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
const baseController_1 = require("./baseController");
var request = require("request-promise");
class IncomeController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.incomeService = new income_service_1.IncomeService();
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(req);
            const income = yield this.incomeService.getIncome(user);
            this.sendResponse(req, res, 'income/index', { income, incomeChart: incomechart_enum_1.IncomeChart });
        });
    }
    /*var request = require('request');
    app.get('/income/transfer', function(req, res){
        console.log('tre')
        request('https://apigti525-jlc.herokuapp.com/api', function(err, body){
            res.json(body); //res is the response object, and it passes info back to client side
        });
    });*/
    /*public async transfer(req: Request, res: Response) {
        const user = await this.getUser(req);
        const income = await this.incomeService.getIncome(user);
        console.log(income)
        this.sendResponse(req,res,'income/index',{income,incomeChart : IncomeChart})
    }*/
    transfer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.method !== 'GET') {
                return next();
            }
            try {
                const user = yield this.getUser(req);
                const income = yield this.incomeService.getIncome(user);
                if (income) {
                    let diffTargetedViews = income.targetedViews - income.cashedTargetedViews;
                    let diffTargetedClicks = income.targetedClicks - income.cashedTargetedClicks;
                    let diffRegularViews = income.regularViews - income.cashedRegularViews;
                    let diffRegularClicks = income.regularClicks - income.cashedRegularClicks;
                    let somme = diffTargetedViews * incomechart_enum_1.IncomeChart.targetedView +
                        diffTargetedClicks * incomechart_enum_1.IncomeChart.targetedClick +
                        diffRegularViews * incomechart_enum_1.IncomeChart.regularView + diffRegularClicks * incomechart_enum_1.IncomeChart.regularClick;
                    if (somme != 0) {
                        console.log(income);
                        console.log(somme);
                        //request({ url: 'https://apigti525-jlc.herokuapp.com/api', method: 'PUT', json: {message: "TOTO"}});
                        var requestA = yield request({ url: 'https://banque2-h19.herokuapp.com/api/v1/challenge/22251450', method: 'GET'}) 
                        console.log(requestA);
                        /*var result = yield request({ url: 'https://h19-passerelle.herokuapp.com/transaction/create', method: 'POST',
                            json: {
                                API_KEY: "string",
                                amount: somme,
                                purchase_desc: "Revenus Analytics",
                                credit_card: {
                                    first_name: "John",
                                    last_name: "Doe",
                                    number: "1111222233334444",
                                    cvv: "765",
                                    exp: "10/22"
                                },
                                merchant: {
                                    name: "Simons",
                                    id: user.accountNumber,
                                }
                            } }, function (error, request, body) {
                            console.log(body.result);
                            if (body.result == 'SUCCESS') {
                                income.cashedTargetedViews = income.targetedViews;
                                income.cashedTargetedClicks = income.targetedClicks;
                                income.cashedRegularViews = income.regularViews;
                                income.cashedRegularClicks = income.regularClicks;
                            }
                            else {
                                return res.json({ 'error': 'Echec de la requête, merci de contacter le créateur du site Analytics' });
                            }
                        });*/
                        //yield this.incomeService.updateIncome(income);
                    }
                }
                res.redirect("/income");
            }
            catch (error) {
                return res.json(error).status(500);
            }
        });
    }
}
exports.IncomeController = IncomeController;
//# sourceMappingURL=incomeController.js.map