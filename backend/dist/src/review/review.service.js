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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const review_1 = require("../../entities/review");
const typeorm_2 = require("typeorm");
const Product_1 = require("../../entities/Product");
let ReviewService = class ReviewService {
    constructor(reviewRepository, productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }
    async create(createReviewDto, userId, productId) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['review'],
        });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        const existingReview = await this.reviewRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });
        if (existingReview) {
            throw new common_1.HttpException('You have already reviewed this product', common_1.HttpStatus.BAD_REQUEST);
        }
        const review = this.reviewRepository.create({
            ...createReviewDto,
            user: { id: userId },
            product: { id: productId },
        });
        this.reviewRepository.save(review);
        return {
            status: 'success',
            message: 'Review created successfully',
            data: { ...review },
        };
    }
    async findAll(productId) {
        const reviews = await this.reviewRepository.find({
            where: {
                product: {
                    id: productId,
                },
            },
            relations: ['user'],
        });
        if (!reviews.length) {
            return {
                status: 'success',
                message: 'No reviews found',
            };
        }
        return {
            status: 'success',
            message: 'Reviews fetched successfully',
            data: { ...reviews },
        };
    }
    async getAllReviewsByUser(userId) {
        const reviews = await this.reviewRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        if (!reviews.length) {
            return {
                status: 'success',
                message: 'No reviews found',
            };
        }
        return {
            status: 'success',
            message: 'Reviews fetched successfully',
            data: { ...reviews },
        };
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user', 'product'],
        });
        if (!review) {
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: 'success',
            message: 'Review fetched successfully',
            data: review,
        };
    }
    async update(id, updateReviewDto, userId) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!review) {
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (review.user.id !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const updatedReview = this.reviewRepository.merge(review, updateReviewDto);
        await this.reviewRepository.save(updatedReview);
        return {
            status: 'success',
            message: 'Review updated successfully',
            data: updatedReview,
        };
    }
    async remove(id, userId) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!review) {
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (review.user.id !== userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.reviewRepository.delete(id);
        return {
            status: 'success',
            message: 'Review deleted successfully',
        };
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map