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
const UserController_1 = require("../controllers/UserController");
class Routes {
    constructor() {
        this.userController = new UserController_1.UserController();
    }
    routes(app) {
        app.route('/authenticate')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.userController.authenticate(req, res); }));
        app.route('/adduser')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () { return this.userController.addUser(req, res); }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map