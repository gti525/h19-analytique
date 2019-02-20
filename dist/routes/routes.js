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
const profileController_1 = require("../controllers/profileController");
const statistiqueController_1 = require("../controllers/statistiqueController");
const role_enums_1 = require("../models/enums/role-enums");
const dashboardController_1 = require("../controllers/dashboardController");
const accountController_1 = require("../controllers/accountController");
const advertiseController_1 = require("../controllers/advertiseController");
const token_guard_1 = require("../middlewares/token.guard");
const incomeController_1 = require("../controllers/incomeController");
const campaignController_1 = require("../controllers/campaignController");
class Routes {
    constructor() {
        this.profileController = new profileController_1.ProfileController();
        this.statistiqueController = new statistiqueController_1.StatistiqueController();
        this.dashboardController = new dashboardController_1.DashboardController();
        this.accountController = new accountController_1.AccountController();
        this.advertiseController = new advertiseController_1.AdvertiseController();
        this.incomeController = new incomeController_1.IncomeController();
        this.campaignController = new campaignController_1.CampaignController();
    }
    routes(app) {
        const sessionChecker = (req, res, next) => {
            if (req.session.user) {
                res.redirect('/');
            }
            else {
                next();
            }
        };
        //Dashboard
        app.route('/')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.dashboardController.index(req, res); }));
        //Account
        app.route('/login')
            .get(sessionChecker, (req, res, next) => {
            this.accountController.getLoginPage(req, res, next);
        })
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.accountController.login(req, res, next); }));
        app.route('/logout')
            .get((req, res, next) => {
            req.session.destroy((err) => res.redirect('/login'));
        })
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.accountController.login(req, res, next); }));
        app.route('/register')
            .get(sessionChecker, (req, res, next) => {
            this.accountController.getRegisterPage(req, res, next);
        })
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.accountController.register(req, res, next); }));
        //Income
        app.route('/income')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.incomeController.index(req, res); }));
        //Profile
        app.route('/profile')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.profileController.index(req, res); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
        app.route('/profile/create')
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.create(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])])
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.create(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
        app.route('/profile/edit')
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.edit(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
        app.route("/profile/edit/:id")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.edit(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
        app.route('/profile/delete/:id')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.profileController.delete(req, res); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
        //Website Statistique
        app.route('/statistique')
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.statistiqueController.index(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.WEBSITEADMIN])]);
        //Campaign
        app.route("/campaign")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.index(req, res); }));
        app.route("/campaign/create")
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.create(req, res, next); }))
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.create(req, res, next); }));
        app.route("/campaign/edit")
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.edit(req, res, next); }));
        app.route("/campaign/edit/:id")
            .get((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.edit(req, res, next); }));
        app.route("/campaign/delete/:id")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.campaignController.delete(req, res); }));
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
        app.route('/api/v1/banner/click/:bannerId/:clientId')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.advertiseController.addClick(req, res); }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map