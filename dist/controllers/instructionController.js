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
const instruction_service_1 = require("../service/instruction.service");
const baseController_1 = require("./baseController");
class InstructionController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.instructionService = new instruction_service_1.InstructionService();
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const instructions = this.instructionService.getInstructions(yield this.getUser(req));
            yield this.sendResponse(req, res, 'instruction/index', { instructions });
        });
    }
}
exports.InstructionController = InstructionController;
//ACM 499 token required, c'est le code a renvoyer si on a pas de token.
//# sourceMappingURL=instructionController.js.map