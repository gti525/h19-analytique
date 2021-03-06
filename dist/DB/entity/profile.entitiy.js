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
const websiteurl_entity_1 = require("./websiteurl.entity");
const campaign_entity_1 = require("./campaign.entity");
const user_entitiy_1 = require("./user.entitiy");
let Profile = class Profile {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Profile.prototype, "identifier", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Profile.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany(type => websiteurl_entity_1.WebSiteUrl, url => url.profile, { onDelete: 'CASCADE', cascade: true }),
    __metadata("design:type", Array)
], Profile.prototype, "urls", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entitiy_1.User, user => user.profile, { cascade: ['insert'] }),
    __metadata("design:type", user_entitiy_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(campaigns => campaign_entity_1.Campaign, campaign => campaign.profiles),
    __metadata("design:type", Array)
], Profile.prototype, "campaigns", void 0);
Profile = __decorate([
    typeorm_1.Entity()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.entitiy.js.map