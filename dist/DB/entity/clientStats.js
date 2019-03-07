"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
const banner_entity_1 = require("./banner.entity");
const user_entitiy_1 = require("./user.entitiy");
let ClientStatistic = class ClientStatistic {
    constructor() {
        this.date = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ClientStatistic.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(client => client_entity_1.Client, client => client.clientStats),
    __metadata("design:type", client_entity_1.Client)
], ClientStatistic.prototype, "client", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ClientStatistic.prototype, "date", void 0);
__decorate([
    typeorm_1.ManyToOne(banner => banner_entity_1.Banner, banner => banner.clientStats),
    __metadata("design:type", banner_entity_1.Banner)
], ClientStatistic.prototype, "banner", void 0);
__decorate([
    typeorm_1.ManyToOne(user => user_entitiy_1.User, user => user.clientStatistics),
    __metadata("design:type", user_entitiy_1.User)
], ClientStatistic.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ClientStatistic.prototype, "isView", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ClientStatistic.prototype, "isClick", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ClientStatistic.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ClientStatistic.prototype, "isTargeted", void 0);
ClientStatistic = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], ClientStatistic);
exports.ClientStatistic = ClientStatistic;
//# sourceMappingURL=clientStats.js.map