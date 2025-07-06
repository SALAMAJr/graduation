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
exports.RepairService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Product_1 = require("../../entities/Product");
const Repair_1 = require("../../entities/Repair");
const User_1 = require("../../entities/User");
const typeorm_2 = require("typeorm");
let RepairService = class RepairService {
    constructor(Repair, Product, User) {
        this.Repair = Repair;
        this.Product = Product;
        this.User = User;
    }
    async getAllRepairs(userId) {
        const user = await this.User.findOne({ where: { id: userId } });
        const getRepairs = async () => {
            const repairs = await this.Repair.find({
                where: {
                    user: { id: userId },
                },
                relations: {
                    user: true,
                    workshop: true,
                    products: true,
                },
            });
            if (repairs.length < 1) {
                throw new common_1.HttpException('you don\'t have any repair rquests yet', common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                status: 'success',
                message: 'all repair requests has been returned successfully',
                repairs,
            };
        };
        if (['user', 'workshop'].includes(user.role)) {
            return getRepairs();
        }
        throw new common_1.HttpException('there isn\'t repair repair requests', common_1.HttpStatus.BAD_REQUEST);
    }
    async makeRepairReq(products, cost, userId, workshopId) {
        if (!products || products.length < 1) {
            throw new common_1.HttpException('please select your all products first', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!cost) {
            throw new common_1.HttpException("the repair cost isn't define", common_1.HttpStatus.BAD_REQUEST);
        }
        const productsArray = [];
        for (const productId of products) {
            const product = await this.Product.findOne({ where: { id: productId } });
            if (!product) {
                throw new common_1.HttpException("one/all of these products aren't exist", common_1.HttpStatus.NOT_IMPLEMENTED);
            }
            if (product.status === Product_1.ProductStatus.ON_HOLD ||
                product.status !== Product_1.ProductStatus.AVAILABLE) {
                throw new common_1.HttpException(`the ${product.name} product is ${product.status} so, you can\'t handle it`, common_1.HttpStatus.NOT_IMPLEMENTED);
            }
            product.status = Product_1.ProductStatus.ON_HOLD;
            await this.Product.save(product);
            productsArray.push(product);
        }
        const user = await this.User.findOne({
            where: {
                id: userId,
            },
        });
        const workshop = await this.User.findOne({
            where: {
                id: workshopId,
            },
        });
        if (!user || !workshop) {
            throw new common_1.HttpException('failed to make a repair request!', common_1.HttpStatus.UNAUTHORIZED);
        }
        const repair = new Repair_1.Repair();
        repair.user = user;
        repair.workshop = workshop;
        repair.products = productsArray;
        repair.cost = cost;
        await this.Repair.save(repair);
        return {
            status: 'success',
            message: 'repair request has been created successfully',
            data: repair,
        };
    }
    async updateRepairReq(userId, repairId, status) {
        const user = await this.User.findOne({ where: { id: userId } });
        if (user.role !== 'workshop') {
            throw new common_1.HttpException("you don\'t have the access on products repairing", common_1.HttpStatus.BAD_REQUEST);
        }
        const repair = await this.Repair.findOne({ where: { repairId } });
        if (!repair) {
            throw new common_1.HttpException("the repair request is't found", common_1.HttpStatus.BAD_REQUEST);
        }
        if (![
            Repair_1.RepairStatus.Accepted,
            Repair_1.RepairStatus.Rejected,
            Repair_1.RepairStatus.Fullfilled,
        ].includes(status)) {
            throw new common_1.HttpException('invalid repair status update', common_1.HttpStatus.BAD_REQUEST);
        }
        if (status === Repair_1.RepairStatus.Rejected) {
            await this.Repair.update({ repairId }, {
                status,
                updatedAt: new Date().toLocaleString(),
            });
            const repair = await this.Repair.findOne({
                where: { repairId },
                relations: { products: true },
            });
            for (const product of repair.products) {
                product.status = Product_1.ProductStatus.AVAILABLE;
                await this.Product.save(product);
            }
            return {
                status: 'success',
                message: 'your repair request has been rejected',
            };
        }
        if (status === Repair_1.RepairStatus.Fullfilled) {
            await this.Repair.update({ repairId }, {
                status,
                updatedAt: new Date().toLocaleString(),
            });
            const repair = await this.Repair.findOne({
                where: { repairId },
                relations: { products: true },
            });
            for (const product of repair.products) {
                product.status = Product_1.ProductStatus.Repaired;
                await this.Product.save(product);
            }
            return {
                status: 'success',
                message: "you've finished your repairing request successfully",
            };
        }
        await this.Repair.update({ repairId }, {
            status,
            updatedAt: new Date().toLocaleString(),
        });
        return {
            status: 'success',
            message: 'your repair request has been updated successfully',
        };
    }
    async deleteRepair(userId, repairId) {
        const user = await this.User.findOne({ where: { id: userId } });
        if (![User_1.Roles.User, User_1.Roles.Admin].includes(user.role)) {
            throw new common_1.HttpException("you can't cancel this repair request", common_1.HttpStatus.BAD_REQUEST);
        }
        const repair = await this.Repair.findOne({
            where: { repairId },
            relations: {
                products: true,
            },
        });
        if (!repair) {
            throw new common_1.HttpException("the repair request is't found !", common_1.HttpStatus.BAD_REQUEST);
        }
        if (repair.status !== 'pending') {
            throw new common_1.HttpException("you can't cancel this repair request", common_1.HttpStatus.BAD_REQUEST);
        }
        await this.Product.update({ repair }, { repair: null });
        await this.Repair.delete({ repairId, status: Repair_1.RepairStatus.Pending });
        return {
            status: 'success',
            message: 'repair request has been cancelled & deleted successfully',
            deletedRepair: repair,
        };
    }
};
exports.RepairService = RepairService;
exports.RepairService = RepairService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Repair_1.Repair)),
    __param(1, (0, typeorm_1.InjectRepository)(Product_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RepairService);
//# sourceMappingURL=repair.service.js.map