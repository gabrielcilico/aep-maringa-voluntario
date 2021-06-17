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
exports.Subscription = void 0;
const typeorm_1 = require("typeorm");
const organization_model_1 = require("../organization/organization-model");
const voluntary_model_1 = require("../voluntary/voluntary-model");
let Subscription = class Subscription {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Subscription.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => organization_model_1.Organization),
    __metadata("design:type", organization_model_1.Organization)
], Subscription.prototype, "organization", void 0);
__decorate([
    typeorm_1.ManyToOne(type => voluntary_model_1.Voluntary),
    __metadata("design:type", voluntary_model_1.Voluntary)
], Subscription.prototype, "voluntary", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Subscription.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
Subscription = __decorate([
    typeorm_1.Entity('subscription')
], Subscription);
exports.Subscription = Subscription;
