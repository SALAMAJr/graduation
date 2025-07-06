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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const class_validator_1 = require("class-validator");
const Order_1 = require("../../../entities/Order");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsUUID)('all', { each: true }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "targetProductId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === Order_1.orderType.exchange || o.type === Order_1.orderType.exchange_plus_cash),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "offeredProductId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_1.orderType),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Order_1.paymentMethod),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === Order_1.orderType.exchange_plus_cash),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "cashAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "points", void 0);
//# sourceMappingURL=create-order.dto.js.map