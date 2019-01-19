import { apiController as ApiController } from "../controllers/apiController";
import express = require("express");
import { tokenGuard } from "../middlewares/token.guard";
import { roleGuard } from "../middlewares/role.guard";
import { ProfileController } from "../controllers/ProfileController";
import { UserRoles } from "../models/enums/role-enums";
import {dashboardController} from "../controllers/dashboardController";

export class Routes{ 
    private userController: ApiController;
    private dashboardController : dashboardController;
    private profileController: ProfileController;
    constructor (){
        this.userController = new ApiController();
        this.profileController = new ProfileController();
        this.dashboardController = new dashboardController();
    }
    public routes(app: express.Application): void {

        //Dashboard
        app.route('/')
            .get(async (req, res) => this.dashboardController.index(req, res));

        //Authentication
        app.route('/authenticate')
            .post(async (req,res) => this.userController.authenticate(req,res));

        app.use(tokenGuard())
        app.route('/user')
        .post(async (req,res) => this.userController.addUser(req,res))

        app.route('/profile')
            .post(async (req,res,next) => this.profileController.addProfile(req,res,next),[roleGuard([UserRoles.ADMIN])])
            .delete(async (req,res) => this.profileController.deleteProfile(req,res),[roleGuard([UserRoles.ADMIN])])
            .put(async (req,res,next) => this.profileController.update(req,res,next),[roleGuard([UserRoles.ADMIN])])
            .get(async (req,res) => this.profileController.getProfile(req,res),[roleGuard([UserRoles.ADMIN])])
    }
}