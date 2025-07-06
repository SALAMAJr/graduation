"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepairModule = void 0;
const common_1 = require("@nestjs/common");
const repair_service_1 = require("./repair.service");
const repair_controller_1 = require("./repair.controller");
const typeorm_1 = require("@nestjs/typeorm");
const Repair_1 = require("../../entities/Repair");
const User_1 = require("../../entities/User");
const Product_1 = require("../../entities/Product");
const jwt_1 = require("@nestjs/jwt");
let RepairModule = class RepairModule {
};
exports.RepairModule = RepairModule;
exports.RepairModule = RepairModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Repair_1.Repair, User_1.User, Product_1.Product]), jwt_1.JwtModule],
        providers: [repair_service_1.RepairService],
        controllers: [repair_controller_1.RepairController]
    })
], RepairModule);
//# sourceMappingURL=repair.module.js.map