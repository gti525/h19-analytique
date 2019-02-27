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
const cors = require('cors');
const role_guard_1 = require("../middlewares/role.guard");
const session_guard_1 = require("../middlewares/session.guard");
const login_guard_1 = require("../middlewares/login.guard");
const profileController_1 = require("../controllers/profileController");
const statistiqueController_1 = require("../controllers/statistiqueController");
const role_enums_1 = require("../models/enums/role-enums");
const dashboardController_1 = require("../controllers/dashboardController");
const accountController_1 = require("../controllers/accountController");
const advertiseController_1 = require("../controllers/advertiseController");
const token_guard_1 = require("../middlewares/token.guard");
const incomeController_1 = require("../controllers/incomeController");
const campaignController_1 = require("../controllers/campaignController");
const instructionController_1 = require("../controllers/instructionController");
class Routes {
    constructor() {
        this.profileController = new profileController_1.ProfileController();
        this.statistiqueController = new statistiqueController_1.StatistiqueController();
        this.dashboardController = new dashboardController_1.DashboardController();
        this.accountController = new accountController_1.AccountController();
        this.advertiseController = new advertiseController_1.AdvertiseController();
        this.incomeController = new incomeController_1.IncomeController();
        this.campaignController = new campaignController_1.CampaignController();
        this.instructionController = new instructionController_1.InstructionController();
    }
    routes(app) {
        const webAdminGuard = [session_guard_1.sessionGuard, role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN, role_enums_1.UserRoles.WEBSITEADMIN])];
        const campaingManagerGuard = [session_guard_1.sessionGuard, role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN, role_enums_1.UserRoles.CAMPAIGNMANAGER])];
        //Dashboard
        app.route('/')
            .get(session_guard_1.sessionGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.dashboardController.index(req, res); }));
        //Account
        app.route('/login')
            .get(login_guard_1.loginGuard, (req, res, next) => {
            this.accountController.getLoginPage(req, res, next);
        })
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.accountController.login(req, res, next); }));
        app.route('/logout')
            .get((req, res, next) => {
            req.session.destroy((err) => res.redirect('/login'));
        })
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.accountController.login(req, res, next); }));
        app.route('/register')
            .get(login_guard_1.loginGuard, (req, res, next) => {
            this.accountController.getRegisterPage(req, res, next);
        })
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.accountController.register(req, res, next); }));
        //Income
        app.route('/income')
            .get(webAdminGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.incomeController.index(req, res); }));
        //Profile
        app.route('/profile')
            .get(campaingManagerGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.profileController.index(req, res); }));
        app.route('/profile/create')
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.create(req, res, next); }))
            .get(campaingManagerGuard, (req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.create(req, res, next); }));
        app.route('/profile/edit')
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.edit(req, res, next); }));
        app.route("/profile/edit/:id")
            .get(campaingManagerGuard, (req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.edit(req, res, next); }));
        app.route('/profile/delete/:id')
            .get(campaingManagerGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.profileController.delete(req, res); }));
        //Instruction
        app.route('/instruction')
            .get(webAdminGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.instructionController.index(req, res); }));
        //Website Statistique
        app.route('/statistique')
            .get(campaingManagerGuard, (req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.statistiqueController.index(req, res, next); }));
        //Campaign
        app.route("/campaign")
            .get(campaingManagerGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.index(req, res); }));
        app.route("/campaign/create")
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.create(req, res, next); }))
            .get(campaingManagerGuard, (req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.create(req, res, next); }));
        app.route("/campaign/edit")
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.edit(req, res, next); }));
        app.route("/campaign/edit/:id")
            .get(campaingManagerGuard, (req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.edit(req, res, next); }));
        app.route("/campaign/delete/:id")
            .get(campaingManagerGuard, (req, res) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.delete(req, res); }));
        // addvertisements and analytics 
        // **************************************
        // *** WARNING           CORS ENABLED ***
        // **************************************
        app.use(cors());
        app.use('/api/v1', token_guard_1.analyticsTokenGuard());
        app.route('/api/v1/analytics/code')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.advertiseController.getAnalitycsCode(req, res); }));
        app.route('/api/v1/analytics/client')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.advertiseController.trackClient(req, res); }));
        app.route('/api/v1/banners/code')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.advertiseController.getBannersCode(req, res); }));
        app.route('/api/v1/banner/:bannerType/:clientId')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.advertiseController.getBanner(req, res); }));
        app.route('/api/v1/banner/click/:clientStatisticId')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.advertiseController.addClick(req, res); }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map