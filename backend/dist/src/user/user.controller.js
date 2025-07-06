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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const UpdateFcmToken_dto_1 = require("./dtos/UpdateFcmToken.dto");
const updateUserDetails_1 = require("./dtos/updateUserDetails");
const platform_express_1 = require("@nestjs/platform-express");
const multerS3 = require("multer-s3");
const s3_client_1 = require("../aws/s3.client");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async updateFcmToken(req, updateFcmToken) {
        const user = req['user'];
        return this.userService.updateFcmToken(updateFcmToken, user.id);
    }
    async updateUserDetails(req, updateUserDetails, file) {
        const user = req['user'];
        return this.userService.updateUserDetails(updateUserDetails, user.id, file);
    }
    async getUserDetails(req, id) {
        if (!id) {
            const user = req['user'];
            return this.userService.findOne(user.id);
        }
        return this.userService.findOne(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('updateFcmToken'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        UpdateFcmToken_dto_1.UpdateFcmTokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateFcmToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multerS3({
            s3: s3_client_1.s3,
            bucket: process.env.AWS_BUCKET_NAME,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const userId = req['user'].id;
                const timestamp = Date.now();
                const fileExtension = file.originalname.split('.').pop();
                const filename = `user-${userId}-${timestamp}.${fileExtension}`;
                cb(null, `${process.env.AWS_UPDATE_FOLDER_NAME}/${filename}`);
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
    (0, common_1.Patch)('updateUserDetails'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        updateUserDetails_1.UpdateUserDetailsDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserDetails", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getUserDetails/:id?'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserDetails", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map