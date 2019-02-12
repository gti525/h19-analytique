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
const client_repo_1 = require("../DB/repo/client.repo");
var sha1 = require('sha1');
class ClientService {
    addClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_repo_1.ClientRepo.create(client);
        });
    }
    getClientByHashOrId(idOrHash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof idOrHash === "string")
                return yield client_repo_1.ClientRepo.findByHash(idOrHash);
            else if (typeof idOrHash === "number")
                return yield client_repo_1.ClientRepo.findById(idOrHash);
            return undefined;
        });
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map