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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Product_1 = require("../../entities/Product");
const typeorm_2 = require("typeorm");
const search_history_service_1 = require("../search-history/search-history.service");
const axios_1 = require("axios");
const SearchHistory_1 = require("../../entities/SearchHistory");
let ProductService = class ProductService {
    constructor(ProductRepository, SearchHistoryRepository, searchHistoryService) {
        this.ProductRepository = ProductRepository;
        this.SearchHistoryRepository = SearchHistoryRepository;
        this.searchHistoryService = searchHistoryService;
        this.apiUrl = 'https://api.mymemory.translated.net/get';
    }
    async create(createProductDto, userId, image) {
        if (!image || !image.location) {
            throw new common_1.HttpException('Image is required to create a product', common_1.HttpStatus.BAD_REQUEST);
        }
        const imageUrl = image.location;
        const product = this.ProductRepository.create({
            ...createProductDto,
            imageUrl,
            user: { id: userId },
        });
        await this.ProductRepository.save(product);
        return {
            status: 'success',
            message: 'Product created successfully',
            data: { product },
        };
    }
    async findAllProduct() {
        const products = await this.ProductRepository.find({});
        if (!products.length) {
            return {
                status: 'success',
                message: 'No products found',
            };
        }
        return {
            status: 'success',
            message: 'Products fetched successfully',
            data: { products },
        };
    }
    async findAllProductByUser(userId) {
        const products = await this.ProductRepository.find({
            where: {
                user: {
                    id: userId,
                },
            },
        });
        if (!products.length) {
            return {
                status: 'success',
                message: 'No products found',
            };
        }
        return {
            status: 'success',
            message: 'Products fetched successfully',
            data: { products },
        };
    }
    async myListings(userId, page = 1, limit = 20) {
        const products = await this.ProductRepository.createQueryBuilder('product')
            .where('product.user.id = :userId', { userId })
            .andWhere('product.status = :status', {
            status: Product_1.ProductStatus.AVAILABLE,
        })
            .orderBy('product.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        if (!products.length) {
            return {
                status: 'success',
                message: 'No products found',
            };
        }
        return {
            status: 'success',
            message: 'Products fetched successfully',
            data: { products },
        };
    }
    async findAllProductByType(type) {
        const products = await this.ProductRepository.find({
            where: { type },
        });
        if (!products.length) {
            return {
                status: 'success',
                message: 'No products found for the specified type',
            };
        }
        return {
            status: 'success',
            message: 'Products fetched successfully',
            data: { products },
        };
    }
    async findOne(id) {
        const product = await this.ProductRepository.findOne({
            where: { id },
        });
        if (!product) {
            return {
                status: 'success',
                message: 'No product found',
            };
        }
        return {
            status: 'success',
            message: 'Product fetched successfully',
            data: { product },
        };
    }
    async update(id, updateProductDto, userId, image) {
        const product = await this.ProductRepository.findOne({
            where: {
                id,
                status: (0, typeorm_2.Not)(Product_1.ProductStatus.SOLD),
            },
            relations: ['user'],
        });
        if (!product) {
            throw new common_1.HttpException('There is no product with that id, or you are not authourized to updated this product', common_1.HttpStatus.NOT_FOUND);
        }
        const imageUrl = image && image.location ? image.location : product.imageUrl;
        if (product.user.id !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this product');
        }
        const updatedProduct = await this.ProductRepository.merge(product, {
            ...updateProductDto,
            imageUrl,
        });
        await this.ProductRepository.save(updatedProduct);
        return {
            status: 'success',
            message: 'Product updated successfully',
            data: { updatedProduct },
        };
    }
    async searchProducts(query, page = 1, limit = 20, userId, saveSearchHistory = true) {
        if (!query || query.trim() === '') {
            throw new common_1.HttpException('Search query cannot be empty', common_1.HttpStatus.BAD_REQUEST);
        }
        const keywords = query.trim().split(/\s+/);
        const translatedKeywords = await Promise.all(keywords.map(async (word) => {
            const language = this.detectLanguage(word);
            if (language === 'ar') {
                return {
                    original: word,
                    translated: await this.translateText(word, 'ar', 'en'),
                    type: 'ar',
                };
            }
            else {
                return {
                    original: word,
                    translated: await this.translateText(word, 'en', 'ar'),
                    type: 'en',
                };
            }
        }));
        const whereConditions = translatedKeywords
            .map((kw, i) => {
            const conditions = [];
            if (kw.type === 'ar') {
                conditions.push(`(product.name LIKE :original${i} OR product.description LIKE :original${i})`, `(product.category LIKE :translated${i})`);
            }
            else {
                conditions.push(`(product.name LIKE :translated${i} OR product.description LIKE :translated${i})`, `(product.category LIKE :original${i})`);
            }
            return `(${conditions.join(' OR ')})`;
        })
            .join(' AND ');
        const parameters = Object.fromEntries(translatedKeywords.flatMap((kw, i) => [
            [`original${i}`, `%${kw.original}%`],
            [`translated${i}`, `%${kw.translated}%`],
        ]));
        const products = await this.ProductRepository.createQueryBuilder('product')
            .leftJoin('product.user', 'user')
            .addSelect(['user.id'])
            .where(whereConditions, parameters)
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
        if (userId && saveSearchHistory) {
            await this.searchHistoryService.saveSearchHistory(keywords, userId);
        }
        return {
            status: 'success',
            message: 'Products fetched successfully',
            data: { products },
        };
    }
    async remove(id, userId) {
        const product = await this.ProductRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!product) {
            return {
                status: 'success',
                message: 'No product found',
            };
        }
        if (product.user.id !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to update this product');
        }
        await this.ProductRepository.delete(id);
        return;
    }
    async homePageProducts(userId, page = 1, limit = 20) {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
        const searchHistories = await this.SearchHistoryRepository.find({
            where: { user: { id: userId } },
            order: { searchedAt: 'DESC' },
            take: 5,
        });
        let products = [];
        if (searchHistories.length === 0) {
            products = await this.ProductRepository.createQueryBuilder('product')
                .leftJoin('product.user', 'user')
                .addSelect(['user.id'])
                .orderBy('RAND()')
                .skip((page - 1) * limit)
                .take(limit)
                .getMany();
        }
        else {
            const keywords = [
                ...new Set(searchHistories.map((history) => history.keyword)),
            ];
            console.log('keywords', keywords);
            const productResults = await Promise.all(keywords.map(async (word) => {
                const product = await this.searchProducts(word, page, Math.floor(limit / keywords.length), userId, false);
                return product.data.products;
            }));
            products = productResults.flat();
        }
        return {
            status: 'success',
            message: 'Products fetched successfully',
            data: { products },
        };
    }
    async translateText(text, from, to) {
        try {
            const response = await axios_1.default.get(this.apiUrl, {
                params: {
                    q: text,
                    langpair: `${from}|${to}`,
                },
            });
            return response.data.responseData.translatedText;
        }
        catch (error) {
            console.error('Translation error:', error.message);
            return text;
        }
    }
    detectLanguage(word) {
        const arabicPattern = /[\u0600-\u06FF]/;
        return arabicPattern.test(word) ? 'ar' : 'en';
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(SearchHistory_1.SearchHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        search_history_service_1.SearchHistoryService])
], ProductService);
//# sourceMappingURL=product.service.js.map