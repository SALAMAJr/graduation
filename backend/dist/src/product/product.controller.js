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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const Product_1 = require("../../entities/Product");
const platform_express_1 = require("@nestjs/platform-express");
const multerS3 = require("multer-s3");
const s3_client_1 = require("../aws/s3.client");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    create(createProductDto, req, file) {
        const user = req['user'];
        return this.productService.create(createProductDto, user.id, file);
    }
    findAllProduct() {
        return this.productService.findAllProduct();
    }
    findAllProductByUser(req) {
        const user = req['user'];
        return this.productService.findAllProductByUser(user.id);
    }
    findAllProductByType(type) {
        return this.productService.findAllProductByType(type);
    }
    findAvailableProducts(req, page = 1, limit = 20) {
        const user = req['user'];
        return this.productService.myListings(user.id, page, limit);
    }
    findOne(id) {
        return this.productService.findOne(id);
    }
    update(id, updateProductDto, req, file) {
        const user = req['user'];
        return this.productService.update(id, updateProductDto, user.id, file);
    }
    search(query, page = 1, limit = 20, req) {
        const user = req['user'];
        return this.productService.searchProducts(query, page, limit, user.id);
    }
    home(req, page = 1, limit = 20) {
        const user = req['user'];
        return this.productService.homePageProducts(user.id, page, limit);
    }
    remove(id, req) {
        const user = req['user'];
        return this.productService.remove(id, user.id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multerS3({
            s3: s3_client_1.s3,
            bucket: process.env.AWS_BUCKET_NAME,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const timestamp = Date.now();
                const fileExtension = file.originalname.split('.').pop();
                const filename = `product-${timestamp}.${fileExtension}`;
                cb(null, `${process.env.AWS_PRODCUT_IMAGES_NAME}/${filename}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/^image\/(jpeg|png|jpg|webp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAllProduct", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('allProductsByUser'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAllProductByUser", null);
__decorate([
    (0, common_1.Get)('allProductsByType/:type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAllProductByType", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('availableProducts'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAvailableProducts", null);
__decorate([
    (0, common_1.Get)('getOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multerS3({
            s3: s3_client_1.s3,
            bucket: process.env.AWS_BUCKET_NAME,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const timestamp = Date.now();
                const fileExtension = file.originalname.split('.').pop();
                const filename = `product-${timestamp}.${fileExtension}`;
                cb(null, `${process.env.AWS_PRODCUT_IMAGES_NAME}/${filename}`);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/^image\/(jpeg|png|jpg|webp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "search", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('home'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "home", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map