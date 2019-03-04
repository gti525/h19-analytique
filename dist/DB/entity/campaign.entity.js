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
const banner_entity_1 = require("./banner.entity");
const profile_entitiy_1 = require("./profile.entitiy");
const user_entitiy_1 = require("./user.entitiy");
let Campaign = class Campaign {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Campaign.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Campaign.prototype, "endDate", void 0);
__decorate([
    typeorm_1.OneToMany(banner => banner_entity_1.Banner, banner => banner.campaigns, { cascade: true, onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Campaign.prototype, "banners", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entitiy_1.User, user => user.campaigns),
    __metadata("design:type", user_entitiy_1.User)
], Campaign.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(profiles => profile_entitiy_1.Profile, profiles => profiles.campaigns),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Campaign.prototype, "profiles", void 0);
Campaign = __decorate([
    typeorm_1.Entity()
], Campaign);
exports.Campaign = Campaign;
var BannerType;
(function (BannerType) {
    BannerType[BannerType["Horizontale"] = 0] = "Horizontale";
    BannerType[BannerType["Verticale"] = 1] = "Verticale";
    BannerType[BannerType["Mobile"] = 2] = "Mobile";
})(BannerType = exports.BannerType || (exports.BannerType = {}));
//# sourceMappingURL=campaign.entity.js.map