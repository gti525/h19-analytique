import express = require("express");
const cors = require('cors');
import { roleGuard } from "../middlewares/role.guard";
import { sessionGuard } from "../middlewares/session.guard";
import { loginGuard } from "../middlewares/login.guard";
import { ProfileController } from "../controllers/profileController";
import { StatistiqueController } from "../controllers/statistiqueController";
import { UserRoles } from "../models/enums/role-enums";
import { DashboardController } from "../controllers/dashboardController";
import { AccountController } from "../controllers/accountController";
import { AdvertiseController } from "../controllers/advertiseController";
import { analyticsTokenGuard } from "../middlewares/token.guard"
import { IncomeController } from "../controllers/incomeController";
import { CampaignController } from "../controllers/campaignController";
import { InstructionController } from "../controllers/instructionController";

export class Routes {
    private dashboardController: DashboardController;
    private profileController: ProfileController;
    private statistiqueController: StatistiqueController;
    private accountController: AccountController;
    private advertiseController: AdvertiseController;
    private incomeController: IncomeController;
    private campaignController: CampaignController;
    private instructionController: InstructionController;

    constructor() {
        this.profileController = new ProfileController();
        this.statistiqueController = new StatistiqueController();
        this.dashboardController = new DashboardController();
        this.accountController = new AccountController();
        this.advertiseController = new AdvertiseController();
        this.incomeController = new IncomeController();
        this.campaignController = new CampaignController();
        this.instructionController = new InstructionController();
    }
    public routes(app: express.Application): void {
        const webAdminGuard = [sessionGuard, roleGuard([UserRoles.ADMIN,UserRoles.WEBSITEADMIN])];
        const campaingManagerGuard = [sessionGuard, roleGuard([UserRoles.ADMIN,UserRoles.CAMPAIGNMANAGER])];
        //Dashboard
        app.route('/')
            .get(sessionGuard,
                async (req, res) => this.dashboardController.index(req, res));
            
        //Account
        app.route('/login')
            .get(loginGuard,(req, res, next) => {
                this.accountController.getLoginPage(req, res, next)
            })
            .post(async (req, res, next) => this.accountController.login(req, res, next));
        app.route('/logout')
            .get((req, res, next) => {
                req.session.destroy( (err) => res.redirect('/login'));
            })
            .post(async (req, res, next) => this.accountController.login(req, res, next));
        app.route('/register')
            .get(loginGuard,(req, res, next) => {
                this.accountController.getRegisterPage(req, res, next);
            })
            .post(async (req, res, next) => this.accountController.register(req, res, next));
            
            //Income
        app.route('/income')
            .get(webAdminGuard,async (req, res, next) => this.incomeController.index(req, res, next));

        app.route('/income/transfer')
            .get(webAdminGuard,async (req, res, next) => this.incomeController.transfer(req, res, next))
            //.get(webAdminGuard,async (req, res, next) => this.incomeController.index(req, res, next));

            //Profile
        app.route('/profile')
            .get(campaingManagerGuard, async (req, res) => this.profileController.index(req, res));
            
        app.route('/profile/create')
            .post(this.profileController.validateform(), async (req, res, next) => this.profileController.create(req, res, next))
            .get(campaingManagerGuard, async (req, res, next) => this.profileController.create(req, res, next));
            
        app.route('/profile/edit')
            .post(async (req, res, next) => this.profileController.edit(req, res, next));

        app.route("/profile/edit/:id")
            .get(campaingManagerGuard, async (req, res, next) => this.profileController.edit(req, res, next));

        app.route('/profile/delete/:id')
            .get(campaingManagerGuard , async (req, res) => this.profileController.delete(req, res));
        //Instruction
        app.route('/instruction')
            .get(webAdminGuard, async (req, res) => this.instructionController.index(req, res));
        //Website Statistique
        app.route('/statistique')
            .get(campaingManagerGuard, async (req, res, next) => this.statistiqueController.index(req, res, next));
        //Campaign
        app.route("/campaign")
            .get(campaingManagerGuard, async (req, res) => this.campaignController.index(req, res));

        app.route("/campaign/create")
            .post(this.campaignController.validate(), async (req, res, next) => this.campaignController.create(req, res, next))
            .get(campaingManagerGuard, async (req, res, next) => this.campaignController.create(req, res, next));

        app.route("/campaign/edit/:id")
            .post(this.campaignController.validate(), async (req, res) => this.campaignController.edit(req, res));

        app.route("/campaign/edit/:id")
            .get(campaingManagerGuard, async (req, res) => this.campaignController.edit(req, res));

        app.route("/campaign/delete/:id")
            .get(campaingManagerGuard, async (req, res) => this.campaignController.delete(req, res));
        // addvertisements and analytics 
        // **************************************
        // *** WARNING           CORS ENABLED ***
        // **************************************

        app.use(cors());
        app.use('/api/v1',analyticsTokenGuard());
        app.route('/api/v1/analytics/code')
            .get(async (req, res) => this.advertiseController.getAnalitycsCode(req, res));
        app.route('/api/v1/analytics/client')
            .post(async (req, res) => this.advertiseController.trackClient(req, res));
        app.route('/api/v1/banners/code')
            .get(async (req, res) => this.advertiseController.getBannersCode(req, res));
        app.route('/api/v1/banner/:bannerType/:clientId')
            .get(async (req, res) => this.advertiseController.getBanner(req, res));
        app.route('/api/v1/banner/click/:clientStatisticId')
            .post(async (req, res) => this.advertiseController.addClick(req, res));
    }
}
