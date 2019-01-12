import { UserController } from "../controllers/UserController";
import express = require("express");

export class Routes{ 
    private userController: UserController; 
    constructor (){
        this.userController = new UserController();   
    }
    public routes(app: express.Application): void {   
        app.route('/authenticate')
        .post(async (req,res) => this.userController.authenticate(req,res))

        app.route('/adduser')
        .post(async (req,res) => this.userController.addUser(req,res))
    }

    
}