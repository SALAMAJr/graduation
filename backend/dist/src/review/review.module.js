"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const review_controller_1 = require("./review.controller");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../entities/User");
const Product_1 = require("../../entities/Product");
const jwt_1 = require("@nestjs/jwt");
const review_1 = require("../../entities/review");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User, Product_1.Product, review_1.Review]), jwt_1.JwtModule],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
        exports: [review_service_1.ReviewService],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map