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
exports.User = exports.Roles = void 0;
const typeorm_1 = require("typeorm");
const Address_1 = require("./Address");
const Order_1 = require("./Order");
const review_1 = require("./review");
const Product_1 = require("./Product");
const Message_1 = require("./Message");
const SearchHistory_1 = require("./SearchHistory");
const Repair_1 = require("./Repair");
var Roles;
(function (Roles) {
    Roles["User"] = "user";
    Roles["Admin"] = "admin";
    Roles["Workshop"] = "workshop";
    Roles["Delivery"] = "delivery";
})(Roles || (exports.Roles = Roles = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'https://miro.medium.com/v2/resize:fill:100:100/1*dmbNkD5D-u45r44go_cf0g.png',
    }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 50 }),
    __metadata("design:type", Number)
], User.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "fcmToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Roles, default: Roles.User }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isOAuthUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.user),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Address_1.Address, (address) => address.user),
    __metadata("design:type", Array)
], User.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Order_1.Order, (order) => order.deliveryman),
    __metadata("design:type", Array)
], User.prototype, "deliveryOrders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_1.Review, (review) => review.user),
    __metadata("design:type", Array)
], User.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.sender),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SearchHistory_1.SearchHistory, (searchHistory) => searchHistory.user),
    __metadata("design:type", Array)
], User.prototype, "searchHistories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Repair_1.Repair, (repair) => repair.user),
    __metadata("design:type", Array)
], User.prototype, "repair", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
//# sourceMappingURL=User.js.map