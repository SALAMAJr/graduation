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
exports.Repair = exports.PaymentMethod = exports.PaymentStatus = exports.RepairStatus = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Product_1 = require("./Product");
var RepairStatus;
(function (RepairStatus) {
    RepairStatus["Pending"] = "pending";
    RepairStatus["Accepted"] = "accepted";
    RepairStatus["Rejected"] = "rejected";
    RepairStatus["Fullfilled"] = "fullfilled";
    RepairStatus["cancelled"] = "cancelled";
})(RepairStatus || (exports.RepairStatus = RepairStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Unpaid"] = "unpaid";
    PaymentStatus["Pending"] = "pending";
    PaymentStatus["Paid"] = "paid";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["Paypal"] = "paypal";
    PaymentMethod["Payoneer"] = "payoneer";
    PaymentMethod["Cash"] = "cash";
    PaymentMethod["Card"] = "card";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let Repair = class Repair {
};
exports.Repair = Repair;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Repair.prototype, "repairId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: RepairStatus,
        default: RepairStatus.Pending,
        nullable: false
    }),
    __metadata("design:type", String)
], Repair.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Repair.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.Unpaid,
        nullable: false
    }),
    __metadata("design:type", String)
], Repair.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.Card,
        nullable: false
    }),
    __metadata("design:type", String)
], Repair.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date().toLocaleString() }),
    __metadata("design:type", String)
], Repair.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date().toLocaleString() }),
    __metadata("design:type", String)
], Repair.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.repair),
    __metadata("design:type", User_1.User)
], Repair.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.repair),
    __metadata("design:type", User_1.User)
], Repair.prototype, "workshop", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.repair),
    __metadata("design:type", Array)
], Repair.prototype, "products", void 0);
exports.Repair = Repair = __decorate([
    (0, typeorm_1.Entity)()
], Repair);
//# sourceMappingURL=Repair.js.map