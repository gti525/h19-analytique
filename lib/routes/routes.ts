import { apiController as ApiController } from "../controllers/apiController";
import express = require("express");
import { tokenGuard } from "../middlewares/token.guard";
import { roleGuard } from "../middlewares/role.guard";
import { ProfileController } from "../controllers/profileController";
import { UserRoles } from "../models/enums/role-enums";
import { DashboardController } from "../controllers/dashboardController";
import { AccountController } from "../controllers/accountController";

export class Routes{ 
    private userController: ApiController;
    private dashboardController : DashboardController;
    private profileController: ProfileController;
    private accountController: AccountController;
    constructor (){
        this.userController = new ApiController();
        this.profileController = new ProfileController();
        this.dashboardController = new DashboardController();
        this.accountController = new AccountController();
    }
    public routes(app: express.Application): void {

        //Account
        app.route('/login')
            .post(async(req, res, next) => this.accountController.login(req, res, next))
            .get(async(req, res, next) => this.accountController.getLoginPage(req, res, next));

        app.route('/register')
            .get(async(req, res, next) => this.accountController.getRegisterPage(req, res, next))
            .post(async(req, res, next) => this.accountController.register(req, res, next));

        //Authentication
        app.route('/authenticate')
            .post(async (req,res) => this.userController.authenticate(req,res));

        //Dashboard
        app.route('/')
            .get(async (req, res) => this.dashboardController.index(req, res));

        //Profile
        app.route('/profile')
            .get(async (req, res) => this.profileController.index(req, res),[roleGuard([UserRoles.ADMIN])]);

        app.route('/profile/create')
            .post(async (req,res,next) => this.profileController.create(req,res,next),[roleGuard([UserRoles.ADMIN])])
            .get(async (req,res,next) => this.profileController.getCreateProfilePage(req,res,next),[roleGuard([UserRoles.ADMIN])]);

        app.route('/profile/edit')
            .post(async (req,res,next) => this.profileController.edit(req,res,next),[roleGuard([UserRoles.ADMIN])]);

        app.route("/profile/edit/:id")
            .get(async (req,res,next) => this.profileController.getProfilePage(req,res,next),[roleGuard([UserRoles.ADMIN])]);

        app.route('/profile/delete/:id')
            .get(async (req,res) => this.profileController.delete(req,res),[roleGuard([UserRoles.ADMIN])]);

        //TokenGuard
        app.use(tokenGuard());

        app.route('/user')
            .post(async (req,res) => this.userController.addUser(req,res));

    }
}