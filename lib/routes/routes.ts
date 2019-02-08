import {apiController as ApiController} from "../controllers/apiController";
import {roleGuard} from "../middlewares/role.guard";
import {ProfileController} from "../controllers/profileController";
import {UserRoles} from "../models/enums/role-enums";
import {DashboardController} from "../controllers/dashboardController";
import {AccountController} from "../controllers/accountController";
import {InstructionController} from "../controllers/instructionController";
import express = require("express");

export class Routes{ 
    private userController: ApiController;
    private dashboardController : DashboardController;
    private profileController: ProfileController;
    private accountController: AccountController;
    private instructionController: InstructionController;
    constructor (){
        this.userController = new ApiController();
        this.profileController = new ProfileController();
        this.dashboardController = new DashboardController();
        this.accountController = new AccountController();
        this.instructionController = new InstructionController();
    }
    public routes(app: express.Application): void {

        app.use((req, res, next) => {
            if (req.cookies.user_sid) {
                res.clearCookie('user_sid');
            }
            next();
        });

        const sessionChecker = (req, res, next) => {
            if (req.session.user && req.cookies.user_sid) {
                res.redirect('/');
            } else {
                next();
            }
        };

        app.get('/', sessionChecker, (req, res) => {
            res.redirect('/login');
        });

        //Account
        app.route('/login')
            .get(sessionChecker, (req, res, next) => {
                this.accountController.getLoginPage(req, res, next)
            })
            .post(async(req, res, next) => this.accountController.login(req, res, next));

        app.route('/register')
            .get(sessionChecker, (req, res, next) => {
                this.accountController.getRegisterPage(req, res, next);
            })
            .post(async(req, res, next) => this.accountController.register(req, res, next));

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

        app.route('/user')
            .post(async (req,res) => this.userController.addUser(req,res));

        //Instruction
        app.route('/instruction')
            .get(async (req, res) => this.instructionController.index(req, res), [roleGuard([UserRoles.ADMIN])]);

    }
}