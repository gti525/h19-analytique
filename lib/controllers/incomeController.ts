import { Request, Response } from 'express';
import { IncomeService } from "../service/income.service";
import { IncomeChart } from "../models/enums/incomechart-enum"
import { BaseController } from './baseController';
import { body } from 'express-validator/check';
var request = require("request-promise");
export class IncomeController extends BaseController{

    private incomeService: IncomeService = new IncomeService();

    public async index(req: Request, res: Response, next) {
        const user = await this.getUser(req);
        const income = await this.incomeService.getIncome(user);
        this.sendResponse(req,res,'income/index',{income,incomeChart : IncomeChart})
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

    public async transfer(req: Request, res: Response, next) {
        if (req.method !== 'GET') {
            return next()
        }
        try {
            const user = await this.getUser(req);
            const income = await this.incomeService.getIncome(user);
            if (income) {
                let diffTargetedViews = income.targetedViews - income.cashedTargetedViews;
                let diffTargetedClicks = income.targetedClicks - income.cashedTargetedClicks;
                let diffRegularViews = income.regularViews - income.cashedRegularViews;
                let diffRegularClicks = income.regularClicks - income.cashedRegularClicks;

                let somme = diffTargetedViews * IncomeChart.targetedView +
                diffTargetedClicks * IncomeChart.targetedClick +
                diffRegularViews * IncomeChart.regularView + diffRegularClicks * IncomeChart.regularClick;
                if(somme != 0){

                    console.log(income)

                    
                    console.log(somme)
                    //request({ url: 'https://apigti525-jlc.herokuapp.com/api', method: 'PUT', json: {message: "TOTO"}});

                    var result = await request({ url: 'https://h19-passerelle.herokuapp.com/transaction/create', method: 'POST', 
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
                            id: user.accountNumber,
                            }
                        
                    }}, function(error, request, body){
                        console.log(body.result);
                        if(body.result == 'SUCCESS'){
                            income.cashedTargetedViews = income.targetedViews;
                            income.cashedTargetedClicks = income.targetedClicks;
                            income.cashedRegularViews = income.regularViews;
                            income.cashedRegularClicks = income.regularClicks;
                        }else{
                            return res.json({'error': 'Echec de la requête, merci de contacter le créateur du site Analytics'});
                        }
                    });

                    await this.incomeService.updateIncome(income);
                }
            }
            res.redirect("/income")
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }


}