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
exports.Order = exports.shippingStatus = exports.paymentMethod = exports.paid_status = exports.OrderStatus = exports.orderType = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
var orderType;
(function (orderType) {
    orderType["purchase"] = "purchase";
    orderType["exchange"] = "exchange";
    orderType["exchange_plus_cash"] = "exchange_plus_cash";
})(orderType || (exports.orderType = orderType = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["AWAITING_PAYMENT"] = "awaiting_payment";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["PROCESSING"] = "processing";
    OrderStatus["AWAITING_SHIPMENT"] = "awaiting_shipment";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["PARTIALLY_SHIPPED"] = "partially_shipped";
    OrderStatus["RETURN_REQUESTED"] = "return_requested";
    OrderStatus["RETURN_PROCESSING"] = "return_processing";
    OrderStatus["RETURNED_COMPLETED"] = "returned_completed";
    OrderStatus["REJECTED"] = "rejected";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var paid_status;
(function (paid_status) {
    paid_status["paid"] = "paid";
    paid_status["unpaid"] = "unpaid";
})(paid_status || (exports.paid_status = paid_status = {}));
var paymentMethod;
(function (paymentMethod) {
    paymentMethod["cash"] = "cash";
    paymentMethod["card"] = "card";
    paymentMethod["wallet"] = "wallet";
})(paymentMethod || (exports.paymentMethod = paymentMethod = {}));
var shippingStatus;
(function (shippingStatus) {
    shippingStatus["AWAITING_FULFILLMENT"] = "Awaiting Fulfillment";
    shippingStatus["LABEL_CREATED"] = "Label Created";
    shippingStatus["DISPATCHED_FOR_PICKUP"] = "Dispatched for Pickup";
    shippingStatus["PICKED_UP"] = "Picked Up";
    shippingStatus["LEFT_CARRIER_LOCATION"] = "Left Carrier Location";
    shippingStatus["IN_TRANSIT"] = "In Transit";
    shippingStatus["ARRIVED_AT_LOCAL_DELIVERY_FACILITY"] = "Arrived at Local Delivery Facility";
    shippingStatus["OUT_FOR_DELIVERY"] = "Out for Delivery";
    shippingStatus["AVAILABLE_FOR_PICKUP"] = "Available for Pickup";
    shippingStatus["DELIVERY_ATTEMPTED"] = "Delivery Attempted";
    shippingStatus["DELIVERED"] = "Delivered";
    shippingStatus["RETURNED_TO_SENDER"] = "Returned to Sender";
    shippingStatus["CANCELLED"] = "Cancelled";
    shippingStatus["DELAYED"] = "Delayed";
    shippingStatus["LOST"] = "Lost";
    shippingStatus["target_Product_DELIVERED__offered_Produc_PICKED_UP"] = "P1 Delivered, P2 Pending Pickup";
    shippingStatus["offeredProduc_IN_TRANSIT_TO_SELLER"] = "Product2 In Transit to Seller";
    shippingStatus["offeredProduc_ARRIVED_AT_SELLER_LOCAL_FACILITY"] = "Product2 Arrived at Seller Local Facility";
    shippingStatus["offeredProduc_OUT_FOR_DELIVERY_TO_SELLER"] = "Product2 Out for Delivery to Seller";
    shippingStatus["EXCHANGE_COMPLETED_ALL_PRODUCTS_DELIVERED"] = "Exchange Completed - All Products Delivered";
})(shippingStatus || (exports.shippingStatus = shippingStatus = {}));
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], Order.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: orderType,
    }),
    __metadata("design:type", String)
], Order.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: paymentMethod,
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Order.prototype, "cashAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "usedPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "newPoints", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.deliveryOrders, { nullable: true }),
    __metadata("design:type", User_1.User)
], Order.prototype, "deliveryman", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: paid_status,
        default: paid_status.unpaid,
    }),
    __metadata("design:type", String)
], Order.prototype, "paidStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: shippingStatus,
        default: shippingStatus.AWAITING_FULFILLMENT,
    }),
    __metadata("design:type", String)
], Order.prototype, "shippingStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "cancelledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "shippedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "deliveredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "confirmedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, { nullable: true }),
    __metadata("design:type", Product_1.Product)
], Order.prototype, "offeredProduct", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.orders),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.order),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' }),
    (0, typeorm_1.Entity)({ name: 'order' })
], Order);
//# sourceMappingURL=Order.js.map