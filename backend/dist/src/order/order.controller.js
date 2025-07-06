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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const Order_1 = require("../../entities/Order");
const update_shipment_status_dto_1 = require("./dto/update-shipment-status.dto");
const update_order_status_dto_1 = require("./dto/update-order-status.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    create(createOrderDto, req) {
        const user = req['user'];
        return this.orderService.create(createOrderDto, user.id);
    }
    findAll(req) {
        const user = req['user'];
        return this.orderService.findAll(user.id);
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    remove(req, orderId, productId) {
        const user = req['user'];
        return this.orderService.removeProductFromOrder(productId, orderId, user.id);
    }
    removeOrder(id, req) {
        const user = req['user'];
        return this.orderService.delete(id, user.id);
    }
    async updateOrderStatus(orderId, Body, req) {
        const userId = req.user.id;
        const newStatus = Body.status;
        const updatedOrder = await this.orderService.updateOrderStatus(orderId, userId, newStatus);
        return {
            status: 'success',
            message: `Order ${status.toLowerCase()} successfully`,
            data: updatedOrder,
        };
    }
    async getUserOrders(req) {
        const user = req['user'];
        return this.orderService.getUserOrders(user.id);
    }
    async getReceivedOrders(req) {
        const user = req['user'];
        return this.orderService.getReceivedOrders(user.id);
    }
    async updateOrderPaymentStatus(orderId, status, req) {
        const user = req['user'];
        return this.orderService.updateOrderPaymentStatus(orderId, user.id, status);
    }
    async getOrderDetails(orderId) {
        return this.orderService.getOrderDetails(orderId);
    }
    async acceptDeliveryOrder(orderId, req) {
        const deliveryman = req['user'];
        return this.orderService.delverymanAcceptOrder(orderId, deliveryman);
    }
    async updateDeliveryStatus(orderId, body, req) {
        const user = req['user'];
        const newStatus = body.status;
        return this.orderService.updateDeliveryStatus(orderId, user.id, newStatus);
    }
    async findAvailableOrdersForDelivery() {
        return this.orderService.findAvailableOrdersForDelivery();
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('getOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('delete/:orderId/:productId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('orderId')),
    __param(2, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "removeOrder", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_status_dto_1.UpdateOrderStatusDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Get)('my-orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserOrders", null);
__decorate([
    (0, common_1.Get)('received-orders'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getReceivedOrders", null);
__decorate([
    (0, common_1.Patch)(':orderId/payment-status'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderPaymentStatus", null);
__decorate([
    (0, common_1.Get)('details/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderDetails", null);
__decorate([
    (0, common_1.Post)(':orderId/accept-delivery'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "acceptDeliveryOrder", null);
__decorate([
    (0, common_1.Patch)(':orderId/delivery-status'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_status_dto_1.updateShipmentStatusDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateDeliveryStatus", null);
__decorate([
    (0, common_1.Get)('available-for-delivery'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAvailableOrdersForDelivery", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map