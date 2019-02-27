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
const profile_entitiy_1 = require("./profile.entitiy");
let WebSiteUrl = class WebSiteUrl {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WebSiteUrl.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WebSiteUrl.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToOne(type => profile_entitiy_1.Profile, profile => profile.urls),
    __metadata("design:type", profile_entitiy_1.Profile)
], WebSiteUrl.prototype, "profile", void 0);
WebSiteUrl = __decorate([
    typeorm_1.Entity()
], WebSiteUrl);
exports.WebSiteUrl = WebSiteUrl;
//# sourceMappingURL=websiteurl.entity.js.map