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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const update_review_dto_1 = require("./dto/update-review.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    create(req, createReviewDto, productId) {
        const user = req['user'];
        return this.reviewService.create(createReviewDto, user.id, productId);
    }
    findAllreviewsByProduct(productId) {
        return this.reviewService.findAll(productId);
    }
    findAllReviewsByUser(req) {
        const user = req['user'];
        return this.reviewService.getAllReviewsByUser(user.id);
    }
    findOne(id) {
        return this.reviewService.findOne(id);
    }
    update(req, id, updateReviewDto) {
        const user = req['user'];
        return this.reviewService.update(id, updateReviewDto, user.id);
    }
    remove(req, id) {
        const user = req['user'];
        return this.reviewService.remove(id, user.id);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('createReviewDto')),
    __param(2, (0, common_1.Body)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto, String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('productReviews/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findAllreviewsByProduct", null);
__decorate([
    (0, common_1.Get)('userReviews'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findAllReviewsByUser", null);
__decorate([
    (0, common_1.Get)('getOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "remove", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map