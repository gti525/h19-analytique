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
const client_entity_1 = require("../../DB/entity/client.entity");
const typeorm_1 = require("typeorm");
class ClientRepo {
    static findByHash(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(client_entity_1.Client);
            return yield userRepository.findOne({ where: { identifier: hash }, relations: ["clientStats"] });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(client_entity_1.Client);
            return yield userRepository.findOne(id, { relations: ["clientStats"] });
        });
    }
    static createOrUpdate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(client_entity_1.Client);
            return yield userRepository.save(user);
        });
    }
}
exports.ClientRepo = ClientRepo;
//# sourceMappingURL=client.repo.js.map