import { apiController } from "../controllers/apiController";
import express = require("express");
import {dashboardController} from "../controllers/dashboardController";

export class Routes{ 
    private userController: apiController;
    private dashboardController : dashboardController;
    constructor (){
        this.userController = new apiController();
        this.dashboardController = new dashboardController();
    }
    public routes(app: express.Application): void {

        //Dashboard
        app.route('/')
            .get(async (req, res) => this.dashboardController.index(req, res));

        //Authentication
        app.route('/authenticate')
            .post(async (req,res) => this.userController.authenticate(req,res));

        app.route('/adduser')
            .post(async (req,res) => this.userController.addUser(req,res))
    }
}