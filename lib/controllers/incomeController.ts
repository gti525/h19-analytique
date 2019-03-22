import { Request, Response } from 'express';
import { IncomeService } from "../service/income.service";
import { IncomeChart } from "../models/enums/incomechart-enum"
import { BaseController } from './baseController';
var request = require("request-promise").defaults({jar: true});
export class IncomeController extends BaseController{

    private incomeService: IncomeService = new IncomeService();

    public async index(req: Request, res: Response, next) {
        const user = await this.getUser(req);
        const income = await this.incomeService.getIncome(user);
        this.sendResponse(req,res,'income/index',{income,incomeChart : IncomeChart})
    }
   
    public async transfer(req, res: Response, next) {
        if (req.method !== 'GET') {
            return next()
        }
        const content: any = {};
        try {
            const user = await this.getUser(req);
            const income = await this.incomeService.getIncome(user);
            if (income) {
                const incomeSum = this.incomeService.calculateProfits(income);
                if(incomeSum > 0){
                    await request({ url: 'https://banque2-h19.herokuapp.com/api/v1/challenge/22251450', method: 'GET'})
                    let response = JSON.parse(await request({ url: 'https://banque2-h19.herokuapp.com/api/v1/challenge/22251450/validate', method: 'POST',form: {
                        userResponse: "banque 2"                
                    }})); 
                    await request({ url: 'https://banque2-h19.herokuapp.com/login',
                        method: 'POST', 
                        simple:false,
                        resolveWithFullResponse: true,
                        form: {
                            password: "qwerty",
                            token: response.token                
                        }}); 
                    
                    response = await request({ url: 'https://banque2-h19.herokuapp.com/api/v1/transaction/bankTransfer', method: 'POST',
                    simple:false,
                    resolveWithFullResponse: true,
                    body: {
                        sourceAccountNumber: 22251450,
                        targetAccountNumber: user.accountNumber,
                        amount: incomeSum
                    },
                    json: true
                    }); 
                    if (response.statusCode === 200){        
                        await this.incomeService.cashIncome(income)
                        req.flash('successes', ['Vous êtes maintenant plus riche!']);
                    }
                    else{
                        content.errors = ["Banque 2 sembe indisponible pour l'instant.  Veuillez réessayer plus tard."];
                        throw new Error();
                    }
                }
                else{
                    req.flash('successes', ["Rien à encaisser pour l'instant"]);
                }
            }
        }
        catch (error) {
            if (!content.error){
                content.errors = ["Une erreur s'est produite.  Veuillez réessayer plus tard."];
            }
            await this.sendResponse(req,res,'income/index', content)
        }
        res.redirect("/income")
    }

}