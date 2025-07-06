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
exports.Product = exports.ProductCategories = exports.PriceType = exports.ProductStatus = exports.ConditionType = exports.ProductType = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
const review_1 = require("./review");
const User_1 = require("./User");
const Repair_1 = require("./Repair");
var ProductType;
(function (ProductType) {
    ProductType["BUY"] = "buy";
    ProductType["REPAIR"] = "repair";
    ProductType["SWAP"] = "swap";
})(ProductType || (exports.ProductType = ProductType = {}));
var ConditionType;
(function (ConditionType) {
    ConditionType["New"] = "new";
    ConditionType["Used"] = "used";
    ConditionType["LikeNew"] = "likeNew";
})(ConditionType || (exports.ConditionType = ConditionType = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["AVAILABLE"] = "available";
    ProductStatus["ON_HOLD"] = "on_hold";
    ProductStatus["SOLD"] = "sold";
    ProductStatus["Repaired"] = "repaired";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var PriceType;
(function (PriceType) {
    PriceType["Fixed"] = "fixed";
    PriceType["Negotiable"] = "negotiable";
})(PriceType || (exports.PriceType = PriceType = {}));
var ProductCategories;
(function (ProductCategories) {
    ProductCategories["LivingRoom"] = "Living Room";
    ProductCategories["Bedroom"] = "Bedroom";
    ProductCategories["DiningKitchen"] = "Dining & Kitchen";
    ProductCategories["HomeOffice"] = "Home Office";
    ProductCategories["OutdoorPatio"] = "Outdoor & Patio";
    ProductCategories["KidsNursery"] = "Kids' & Nursery";
    ProductCategories["StorageFurniture"] = "Storage Furniture";
    ProductCategories["AccentFurniture"] = "Accent Furniture";
    ProductCategories["SofasSectionals"] = "Sofas & Sectionals";
    ProductCategories["BedsHeadboards"] = "Beds & Headboards";
    ProductCategories["Tables"] = "Tables";
    ProductCategories["Chairs"] = "Chairs";
    ProductCategories["BookshelvesCabinets"] = "Bookshelves & Cabinets";
    ProductCategories["DressersChests"] = "Dressers & Chests";
    ProductCategories["TVStandsMediaConsoles"] = "TV Stands & Media Consoles";
    ProductCategories["Desks"] = "Desks";
    ProductCategories["OfficeChairs"] = "Office Chairs";
    ProductCategories["PatioSets"] = "Patio Sets";
    ProductCategories["DiningSets"] = "Dining Sets";
    ProductCategories["Mattresses"] = "Mattresses";
    ProductCategories["OtherFurniture"] = "Other Furniture";
})(ProductCategories || (exports.ProductCategories = ProductCategories = {}));
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('longtext', { nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductType,
        default: ProductType.BUY,
    }),
    __metadata("design:type", String)
], Product.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ConditionType }),
    __metadata("design:type", String)
], Product.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductStatus,
        default: ProductStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProductCategories,
    }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: PriceType, default: PriceType.Fixed }),
    __metadata("design:type", String)
], Product.prototype, "priceType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.products, { eager: false }),
    __metadata("design:type", User_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, (order) => order.products),
    __metadata("design:type", Order_1.Order)
], Product.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Repair_1.Repair, (repair) => repair.products),
    (0, typeorm_1.JoinColumn)({ name: 'repairId' }),
    __metadata("design:type", Repair_1.Repair)
], Product.prototype, "repair", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'product' })
], Product);
//# sourceMappingURL=Product.js.map