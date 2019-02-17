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
const user_entitiy_1 = require("./user.entitiy");
let Income = class Income {
    constructor() {
        this.targetedViews = 0;
        this.targetedClicks = 0;
        this.regularViews = 0;
        this.regularClicks = 0;
        this.cashedTargetedViews = 0;
        this.cashedTargetedClicks = 0;
        this.cashedRegularViews = 0;
        this.cashedRegularClicks = 0;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], Income.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Income.prototype, "cashedTargetedViews", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Income.prototype, "cashedTargetedClicks", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Income.prototype, "cashedRegularViews", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Income.prototype, "cashedRegularClicks", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entitiy_1.User, user => user.income),
    __metadata("design:type", user_entitiy_1.User)
], Income.prototype, "user", void 0);
Income = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], Income);
exports.Income = Income;
//# sourceMappingURL=income.entitiy.js.map