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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../entities/User");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    async findOne(id) {
        const user = this.UserRepository.findOne({ where: { id } });
        return user;
    }
    async updateFcmToken(updateFcmToken, userId) {
        await this.UserRepository.update(userId, {
            fcmToken: updateFcmToken.fcmToken,
        });
        return { status: 'success', message: 'FCM token updated successfully' };
    }
    async updateUserDetails(updateUserDetails, userId, image) {
        let imagePath;
        if (image) {
            imagePath = image.location;
        }
        const user = await this.UserRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.HttpException('No such user with that Id', common_1.HttpStatus.NOT_FOUND);
        }
        const updatedUser = await this.UserRepository.merge(user, {
            firstName: updateUserDetails.firstName
                ? updateUserDetails.firstName
                : user.firstName,
            lastName: updateUserDetails.lastName
                ? updateUserDetails.lastName
                : user.lastName,
            image: imagePath ? imagePath : user.image,
            dateOfBirth: updateUserDetails.dateOfBirth
                ? updateUserDetails.dateOfBirth
                : user.dateOfBirth,
        });
        await this.UserRepository.save(updatedUser);
        return {
            status: 'success',
            message: 'User details updated successfully',
            data: updatedUser,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map