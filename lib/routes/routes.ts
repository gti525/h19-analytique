import { apiController as ApiController } from "../controllers/apiController";
import express = require("express");
const cors = require('cors');
import { roleGuard } from "../middlewares/role.guard";
import { ProfileController } from "../controllers/profileController";
import { StatistiqueController } from "../controllers/statistiqueController";
import { UserRoles } from "../models/enums/role-enums";
import { DashboardController } from "../controllers/dashboardController";
import { AccountController } from "../controllers/accountController";
import { AdvertiseController } from "../controllers/advertiseController";
import { analyticsTokenGuard } from "../middlewares/token.guard"
import { IncomeController } from "../controllers/incomeController";
import { CampaignController } from "../controllers/campaignController";

export class Routes {
    private userController: ApiController;
    private dashboardController: DashboardController;
    private profileController: ProfileController;
    private statistiqueController: StatistiqueController;
    private accountController: AccountController;
    private advertiseController: AdvertiseController;
    private incomeController: IncomeController;
    private campaignController: CampaignController;

    constructor() {
        this.userController = new ApiController();
        this.profileController = new ProfileController();
        this.statistiqueController = new StatistiqueController();
        this.dashboardController = new DashboardController();
        this.accountController = new AccountController();
        this.advertiseController = new AdvertiseController();
        this.incomeController = new IncomeController();
        this.campaignController = new CampaignController();
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
            .post(async (req, res, next) => this.accountController.login(req, res, next));

        app.route('/register')
            .get(sessionChecker, (req, res, next) => {
                this.accountController.getRegisterPage(req, res, next);
            })
            .post(async (req, res, next) => this.accountController.register(req, res, next));

        //Dashboard
        app.route('/')
            .get(async (req, res) => this.dashboardController.index(req, res));

        //Income
        app.route('/income')
            .get(async (req, res) => this.incomeController.index(req, res));

        //Profile
        app.route('/profile')
            .get(async (req, res) => this.profileController.index(req, res), [roleGuard([UserRoles.ADMIN])]);

        app.route('/profile/create')
            .post(async (req, res, next) => this.profileController.create(req, res, next), [roleGuard([UserRoles.ADMIN])])
            .get(async (req, res, next) => this.profileController.create(req, res, next), [roleGuard([UserRoles.ADMIN])]);

        app.route('/profile/edit')
            .post(async (req, res, next) => this.profileController.edit(req, res, next), [roleGuard([UserRoles.ADMIN])]);

        app.route("/profile/edit/:id")
            .get(async (req, res, next) => this.profileController.edit(req, res, next), [roleGuard([UserRoles.ADMIN])]);

        app.route('/profile/delete/:id')
            .get(async (req, res) => this.profileController.delete(req, res), [roleGuard([UserRoles.ADMIN])]);

        app.route('/user')
            .post(async (req, res) => this.userController.addUser(req, res));

        //Website Statistique
        app.route('/statistique')
            .get(async (req, res, next) => this.statistiqueController.index(req, res, next), [roleGuard([UserRoles.WEBSITEADMIN])]);
        //Campaign
        app.route("/campaign")
            .get(async (req, res) => this.campaignController.index(req, res));

        app.route("/campaign/create")
            .post(async (req, res, next) => this.campaignController.create(req, res, next))
            .get(async (req, res, next) => this.campaignController.create(req, res, next));

        app.route("/campaign/edit")
            .post(async (req, res, next) => this.campaignController.edit(req, res, next));

        app.route("/campaign/edit/:id")
            .get(async (req, res, next) => this.campaignController.edit(req, res, next));

        app.route("/campaign/delete/:id")
            .get(async (req, res) => this.campaignController.delete(req, res));
        // addvertisements and analytics 
        // **************************************
        // *** WARNING           CORS ENABLED ***
        // **************************************

        app.use(cors());
        app.use(analyticsTokenGuard())
        app.route('/api/analytics/code')
            .get(async (req, res) => this.advertiseController.getAnalitycsCode(req, res));
        app.route('/api/analytics/client')
            .post(async (req, res) => this.advertiseController.trackClient(req, res));
        app.route('/api/analytics/banner')
            .post(async (req, res) => this.advertiseController.getBanner(req, res));
    }
}
