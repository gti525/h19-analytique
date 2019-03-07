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
const campaign_entity_1 = require("./campaign.entity");
const clientStats_1 = require("./clientStats");
let Banner = class Banner {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Banner.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Banner.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ type: "longtext" }),
    __metadata("design:type", String)
], Banner.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Banner.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => campaign_entity_1.Campaign, campaign => campaign.banners, { onDelete: "CASCADE" }),
    __metadata("design:type", campaign_entity_1.Campaign)
], Banner.prototype, "campaigns", void 0);
__decorate([
    typeorm_1.OneToMany(clientStats => clientStats_1.ClientStatistic, clientStats => clientStats.banner),
    __metadata("design:type", Array)
], Banner.prototype, "clientStats", void 0);
Banner = __decorate([
    typeorm_1.Entity()
], Banner);
exports.Banner = Banner;
//# sourceMappingURL=banner.entity.js.map