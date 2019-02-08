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
const apiController_1 = require("../controllers/apiController");
const token_guard_1 = require("../middlewares/token.guard");
const role_guard_1 = require("../middlewares/role.guard");
const ProfileController_1 = require("../controllers/ProfileController");
const role_enums_1 = require("../models/enums/role-enums");
const dashboardController_1 = require("../controllers/dashboardController");
const InstructionController_1 = require("../controllers/InstructionController");
class Routes {
    constructor() {
        this.userController = new apiController_1.apiController();
        this.profileController = new ProfileController_1.ProfileController();
        this.dashboardController = new dashboardController_1.dashboardController();
        this.instructionController = new InstructionController_1.InstructionController_1();
    }
    routes(app) {
        //Dashboard
        app.route('/')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.dashboardController.index(req, res); }));
        //Authentication
        app.route('/authenticate')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.userController.authenticate(req, res); }));
        app.use(token_guard_1.tokenGuard());
        app.route('/user')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.userController.addUser(req, res); }));
        app.route('/profile')
            .post((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.addProfile(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])])
            .delete((req, res) => __awaiter(this, void 0, void 0, function* () { return this.profileController.deleteProfile(req, res); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])])
            .put((req, res, next) => __awaiter(this, void 0, void 0, function* () { return this.profileController.update(req, res, next); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])])
            .get((req, res) => __awaiter(this, void 0, void 0, function* () { return this.profileController.getProfile(req, res); }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
        app.route("/instruction")
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
                return this.instructionController.getInstruction(req, res);
            }), [role_guard_1.roleGuard([role_enums_1.UserRoles.ADMIN])]);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map