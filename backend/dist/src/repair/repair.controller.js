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
exports.RepairController = void 0;
const common_1 = require("@nestjs/common");
const repair_service_1 = require("./repair.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const Repair_1 = require("../../entities/Repair");
let RepairController = class RepairController {
    constructor(repairService) {
        this.repairService = repairService;
    }
    async getAllRepairs(req) {
        const userId = req['user'].id;
        const repairs = await this.repairService.getAllRepairs(userId);
        return repairs;
    }
    async makeRepairReq(products, cost, workshopId, req) {
        const userId = req['user'].id;
        const repair = await this.repairService.makeRepairReq(products, cost, userId, workshopId);
        return repair;
    }
    async updateRepiarReq(repairId, status, req) {
        const userId = req['user'].id;
        const updateRepiar = await this.repairService.updateRepairReq(userId, repairId, status);
        return updateRepiar;
    }
    async deleteRepairReq(repairId, req) {
        const userId = req['user'].id;
        const deleteRepair = await this.repairService.deleteRepair(userId, repairId);
        return deleteRepair;
    }
};
exports.RepairController = RepairController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "getAllRepairs", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Body)('products')),
    __param(1, (0, common_1.Body)('cost')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, String, Request]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "makeRepairReq", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Request]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "updateRepiarReq", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Request]),
    __metadata("design:returntype", Promise)
], RepairController.prototype, "deleteRepairReq", null);
exports.RepairController = RepairController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('repair'),
    __metadata("design:paramtypes", [repair_service_1.RepairService])
], RepairController);
//# sourceMappingURL=repair.controller.js.map