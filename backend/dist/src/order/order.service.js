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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Order_1 = require("../../entities/Order");
const typeorm_2 = require("typeorm");
const Product_1 = require("../../entities/Product");
const User_1 = require("../../entities/User");
let OrderService = class OrderService {
    async create(createOrderDto, userId) {
        let products = [];
        let price = 0;
        let name = '';
        let offeredProduct = null;
        for (const productId of createOrderDto.targetProductId) {
            const product = await this.Product.findOne({
                where: { id: productId, status: Product_1.ProductStatus.AVAILABLE },
            });
            if (!product) {
                throw new common_1.HttpException(`Product with id ${productId} not found, or this product not available`, common_1.HttpStatus.NOT_FOUND);
            }
            products.push(product);
            price += product.price;
            name = product.name + ' ' + name;
        }
        if (createOrderDto.offeredProductId) {
            offeredProduct = await this.Product.findOne({
                where: {
                    id: createOrderDto.offeredProductId,
                    user: { id: userId },
                    status: Product_1.ProductStatus.AVAILABLE,
                },
                relations: ['user'],
            });
            if (!offeredProduct) {
                throw new common_1.HttpException(`Offered product with id ${createOrderDto.offeredProductId} not found or not yours`, common_1.HttpStatus.NOT_FOUND);
            }
            for (const productId of createOrderDto.targetProductId) {
                if (offeredProduct.id === productId) {
                    throw new common_1.HttpException(`You cannot offer and target the same product`, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (createOrderDto.type === 'exchange_plus_cash') {
                price = createOrderDto.cashAmount;
            }
            else if (createOrderDto.type === 'exchange') {
                price = 0;
            }
        }
        let discount = 0;
        let usedPoints = 0;
        let user = await this.User.findOne({
            where: { id: userId },
        });
        let points = user.points - createOrderDto.points;
        if (points < 0) {
            throw new common_1.HttpException(`You don't have enough points`, common_1.HttpStatus.BAD_REQUEST);
        }
        if (createOrderDto.points) {
            const requestedDiscount = createOrderDto.points / 10;
            if (requestedDiscount > price) {
                discount = price;
                usedPoints = price * 10;
            }
            else {
                discount = requestedDiscount;
                usedPoints = createOrderDto.points;
            }
            price -= discount;
        }
        const newPoints = Math.floor(price / 10);
        user.points -= usedPoints;
        await this.User.save(user);
        console.log('newPoints', newPoints);
        console.log('usedPoints', usedPoints);
        const order = this.Order.create({
            products,
            price,
            user: { id: userId },
            type: createOrderDto.type,
            paymentMethod: createOrderDto.paymentMethod,
            cashAmount: createOrderDto.cashAmount,
            offeredProduct: offeredProduct,
            usedPoints: usedPoints,
            newPoints: newPoints,
        });
        for (const product of products) {
            await this.Product.update({ id: product.id }, { status: Product_1.ProductStatus.ON_HOLD });
        }
        if (offeredProduct) {
            await this.Product.update({ id: offeredProduct.id }, { status: Product_1.ProductStatus.ON_HOLD });
        }
        await this.Order.save(order);
        return {
            status: 'success',
            message: 'Order created successfully',
            data: order,
        };
    }
    async findAll(userId) {
        const orders = await this.Order.find({
            where: { user: { id: userId } },
            relations: ['products'],
        });
        if (!orders) {
            return {
                status: 'not found',
                message: 'No orders found',
            };
        }
        return {
            status: 'success',
            message: 'Orders fetched successfully',
            data: orders,
        };
    }
    async findOne(id) {
        const order = await this.Order.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: 'success',
            message: 'Order fetched successfully',
            data: order,
        };
    }
    async removeProductFromOrder(productId, orderId, userId) {
        const { order } = await this.checkId(orderId, userId);
        const product = await this.Product.findOne({ where: { id: productId } });
        if (!product || !order.products.find((p) => p.id === productId)) {
            throw new common_1.HttpException('either product not found or the product is not inside the order', common_1.HttpStatus.NOT_FOUND);
        }
        order.price = order.price - product.price;
        order.products = order.products.filter((p) => p.id !== productId);
        await this.Order.save(order);
        return {
            status: 'success',
            message: 'Product removed from order successfully',
            data: order,
        };
    }
    async delete(id, userId) {
        const { order } = await this.checkId(id, userId);
        await this.Product.update({ order: { id: order.id } }, { order: null });
        await this.Order.remove(order);
        return;
    }
    async checkId(orderId, userId) {
        const order = await this.Order.findOne({
            where: { id: orderId },
            relations: ['user', 'products'],
            select: ['id', 'user', 'products', 'price'],
        });
        if (!order || !(order.user.id === userId))
            throw new common_1.HttpException('Not valid order id', common_1.HttpStatus.NOT_FOUND);
        return { order };
    }
    async updateOrderStatus(orderId, userId, status) {
        const order = await this.Order.findOne({
            where: { id: orderId },
            relations: ['products', 'products.user', 'offeredProduct', 'user'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const seller = await this.User.findOne({ where: { id: userId } });
        const customer = await this.User.findOne({ where: { id: order.user.id } });
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
        }
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const ownsAllProducts = order.products.every((product) => product.user.id === userId);
        if (!ownsAllProducts) {
            throw new common_1.ForbiddenException('You are not authorized to update this order');
        }
        const validTransitions = {
            [Order_1.OrderStatus.PENDING]: [Order_1.OrderStatus.CONFIRMED, Order_1.OrderStatus.REJECTED],
            [Order_1.OrderStatus.CONFIRMED]: [Order_1.OrderStatus.PROCESSING],
            [Order_1.OrderStatus.PROCESSING]: [Order_1.OrderStatus.AWAITING_SHIPMENT],
            [Order_1.OrderStatus.AWAITING_SHIPMENT]: [Order_1.OrderStatus.CONFIRMED],
            [Order_1.OrderStatus.COMPLETED]: [],
            [Order_1.OrderStatus.REJECTED]: [],
            [Order_1.OrderStatus.CANCELLED]: [],
        };
        if (!validTransitions[order.status]?.includes(status)) {
            let errorMessage = '';
            switch (order.status) {
                case Order_1.OrderStatus.PENDING:
                    errorMessage = 'Order can only be Confirmed or Rejected from Pending status';
                    break;
                case Order_1.OrderStatus.CONFIRMED:
                    errorMessage = 'Confirmed order must be moved to Processing status';
                    break;
                case Order_1.OrderStatus.PROCESSING:
                    errorMessage = 'Processing order must be moved to Awaiting Shipment status when ready for pickup';
                    break;
                case Order_1.OrderStatus.AWAITING_SHIPMENT:
                    errorMessage = 'You can move the order back to Confirmed if needed';
                    break;
                default:
                    errorMessage = `Cannot change status from ${order.status} to ${status}`;
            }
            throw new common_1.BadRequestException(errorMessage);
        }
        switch (status) {
            case Order_1.OrderStatus.CONFIRMED:
                order.confirmedAt = new Date();
                break;
            case Order_1.OrderStatus.REJECTED:
                order.cancelledAt = new Date();
                break;
            case Order_1.OrderStatus.AWAITING_SHIPMENT:
                order.shippingStatus = Order_1.shippingStatus.AWAITING_FULFILLMENT;
                break;
        }
        order.status = status;
        if (status === Order_1.OrderStatus.REJECTED) {
            customer.points += order.usedPoints;
            await this.User.save(customer);
            for (const product of order.products) {
                await this.Product.update({ id: product.id }, { status: Product_1.ProductStatus.AVAILABLE });
            }
            if (order.offeredProduct) {
                await this.Product.update({ id: order.offeredProduct.id }, { status: Product_1.ProductStatus.AVAILABLE });
            }
        }
        if (status === Order_1.OrderStatus.CONFIRMED) {
            customer.points += order.newPoints;
            await this.User.save(customer);
        }
        await this.Order.save(order);
        return order;
    }
    async delverymanAcceptOrder(orderId, deliveryman) {
        deliveryman = await this.User.findOne({
            where: { id: deliveryman.id, role: User_1.Roles.Delivery },
        });
        if (!deliveryman) {
            throw new common_1.NotFoundException('Deliveryman not found');
        }
        const order = await this.Order.findOne({
            where: { id: orderId, deliveryman: null },
            relations: ['products', 'user'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found or already accepted');
        }
        if (order.status !== Order_1.OrderStatus.AWAITING_SHIPMENT) {
            throw new common_1.BadRequestException('Order is not not ready for shipment yet');
        }
        order.deliveryman = deliveryman;
        order.status = Order_1.OrderStatus.SHIPPED;
        order.shippingStatus = Order_1.shippingStatus.DISPATCHED_FOR_PICKUP;
        await this.Order.save(order);
        return {
            data: order,
        };
    }
    async updateDeliveryStatus(orderId, deliverymanId, newShippingStatus) {
        const order = await this.Order.findOne({
            where: { id: orderId },
            relations: ['deliveryman', 'offeredProduct'],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (!order.deliveryman || order.deliveryman.id !== deliverymanId) {
            throw new common_1.ForbiddenException('You are not authorized to update this order - not assigned to you');
        }
        const specialStatuses = [
            Order_1.shippingStatus.DELAYED,
            Order_1.shippingStatus.LOST,
            Order_1.shippingStatus.CANCELLED,
        ];
        if (newShippingStatus === Order_1.shippingStatus.RETURNED_TO_SENDER) {
            const validPreviousStates = [
                Order_1.shippingStatus.DELAYED,
                Order_1.shippingStatus.CANCELLED,
                Order_1.shippingStatus.LOST,
            ];
            if (!validPreviousStates.includes(order.shippingStatus)) {
                throw new common_1.BadRequestException('Order can only be returned to sender from delayed, cancelled, or lost status');
            }
        }
        else if (specialStatuses.includes(newShippingStatus)) {
        }
        else if (order.type === Order_1.orderType.purchase) {
            const purchaseFlow = {
                [Order_1.shippingStatus.DISPATCHED_FOR_PICKUP]: [Order_1.shippingStatus.PICKED_UP],
                [Order_1.shippingStatus.PICKED_UP]: [Order_1.shippingStatus.LEFT_CARRIER_LOCATION],
                [Order_1.shippingStatus.LEFT_CARRIER_LOCATION]: [Order_1.shippingStatus.IN_TRANSIT],
                [Order_1.shippingStatus.IN_TRANSIT]: [Order_1.shippingStatus.ARRIVED_AT_LOCAL_DELIVERY_FACILITY],
                [Order_1.shippingStatus.ARRIVED_AT_LOCAL_DELIVERY_FACILITY]: [Order_1.shippingStatus.OUT_FOR_DELIVERY],
                [Order_1.shippingStatus.OUT_FOR_DELIVERY]: [Order_1.shippingStatus.AVAILABLE_FOR_PICKUP],
                [Order_1.shippingStatus.AVAILABLE_FOR_PICKUP]: [Order_1.shippingStatus.DELIVERED],
            };
            if (!purchaseFlow[order.shippingStatus]?.includes(newShippingStatus)) {
                throw new common_1.BadRequestException(`Invalid status transition from ${order.shippingStatus} to ${newShippingStatus} for purchase order`);
            }
        }
        else if (order.type === Order_1.orderType.exchange || order.type === Order_1.orderType.exchange_plus_cash) {
            const exchangeFlow = {
                [Order_1.shippingStatus.AVAILABLE_FOR_PICKUP]: [Order_1.shippingStatus.target_Product_DELIVERED__offered_Produc_PICKED_UP],
                [Order_1.shippingStatus.target_Product_DELIVERED__offered_Produc_PICKED_UP]: [Order_1.shippingStatus.offeredProduc_IN_TRANSIT_TO_SELLER],
                [Order_1.shippingStatus.offeredProduc_IN_TRANSIT_TO_SELLER]: [Order_1.shippingStatus.offeredProduc_ARRIVED_AT_SELLER_LOCAL_FACILITY],
                [Order_1.shippingStatus.offeredProduc_ARRIVED_AT_SELLER_LOCAL_FACILITY]: [Order_1.shippingStatus.offeredProduc_OUT_FOR_DELIVERY_TO_SELLER],
                [Order_1.shippingStatus.offeredProduc_OUT_FOR_DELIVERY_TO_SELLER]: [Order_1.shippingStatus.EXCHANGE_COMPLETED_ALL_PRODUCTS_DELIVERED],
            };
            if (order.shippingStatus === Order_1.shippingStatus.AVAILABLE_FOR_PICKUP ||
                Object.keys(exchangeFlow).includes(order.shippingStatus)) {
                if (!exchangeFlow[order.shippingStatus]?.includes(newShippingStatus)) {
                    throw new common_1.BadRequestException(`Invalid status transition from ${order.shippingStatus} to ${newShippingStatus} for exchange order`);
                }
            }
            else {
                const initialFlow = {
                    [Order_1.shippingStatus.DISPATCHED_FOR_PICKUP]: [Order_1.shippingStatus.PICKED_UP],
                    [Order_1.shippingStatus.PICKED_UP]: [Order_1.shippingStatus.LEFT_CARRIER_LOCATION],
                    [Order_1.shippingStatus.LEFT_CARRIER_LOCATION]: [Order_1.shippingStatus.IN_TRANSIT],
                    [Order_1.shippingStatus.IN_TRANSIT]: [Order_1.shippingStatus.ARRIVED_AT_LOCAL_DELIVERY_FACILITY],
                    [Order_1.shippingStatus.ARRIVED_AT_LOCAL_DELIVERY_FACILITY]: [Order_1.shippingStatus.OUT_FOR_DELIVERY],
                    [Order_1.shippingStatus.OUT_FOR_DELIVERY]: [Order_1.shippingStatus.AVAILABLE_FOR_PICKUP],
                };
                if (!initialFlow[order.shippingStatus]?.includes(newShippingStatus)) {
                    throw new common_1.BadRequestException(`Invalid status transition from ${order.shippingStatus} to ${newShippingStatus}`);
                }
            }
        }
        order.shippingStatus = newShippingStatus;
        if (newShippingStatus === Order_1.shippingStatus.DELIVERED ||
            newShippingStatus === Order_1.shippingStatus.EXCHANGE_COMPLETED_ALL_PRODUCTS_DELIVERED) {
            order.status = Order_1.OrderStatus.COMPLETED;
            order.deliveredAt = new Date();
        }
        await this.Order.save(order);
        return {
            status: 'success',
            message: `Shipping status updated to ${newShippingStatus}`,
            data: order,
        };
    }
    async findAvailableOrdersForDelivery() {
        const orders = await this.Order.find({
            where: {
                status: Order_1.OrderStatus.AWAITING_SHIPMENT,
                deliveryman: null,
            },
            relations: [
                'products',
                'user',
                'user.addresses',
            ],
            order: {
                createdAt: 'ASC',
            },
        });
        if (!orders.length) {
            return {
                status: 'success',
                message: 'No orders available for delivery at the moment',
                data: [],
            };
        }
        return {
            status: 'success',
            message: 'Found orders ready for delivery',
            data: orders,
        };
    }
    async getOrderDetails(orderId) {
        const order = await this.Order.findOne({
            where: { id: orderId },
            relations: [
                'products',
                'user',
                'user.addresses',
                'deliveryman',
                'offeredProduct',
            ],
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const orderDetails = {
            orderId: order.id,
            orderType: order.type,
            status: {
                orderStatus: order.status,
                shippingStatus: order.shippingStatus,
                paidStatus: order.paidStatus
            },
            timestamps: {
                createdAt: order.createdAt,
                confirmedAt: order.confirmedAt,
                shippedAt: order.shippedAt,
                deliveredAt: order.deliveredAt,
                cancelledAt: order.cancelledAt
            },
            customerInfo: {
                id: order.user.id,
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                email: order.user.email,
                phone: order.user.phone,
                image: order.user.image,
                addresses: order.user.addresses.map(addr => ({
                    id: addr.id,
                    fullName: addr.fullName,
                    streetAddress: addr.streetAddress,
                    city: addr.city,
                    state: addr.state,
                    country: addr.country,
                    postalCode: addr.postalCode,
                    phoneNumber: addr.phoneNumber
                }))
            },
            deliveryInfo: order.deliveryman ? {
                id: order.deliveryman.id,
                firstName: order.deliveryman.firstName,
                lastName: order.deliveryman.lastName,
                phone: order.deliveryman.phone,
                image: order.deliveryman.image
            } : null,
            products: order.products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                condition: product.condition,
                type: product.type,
                status: product.status,
                location: product.location,
                imageUrl: product.imageUrl,
                createdAt: product.createdAt
            })),
            offeredProduct: order.offeredProduct ? {
                id: order.offeredProduct.id,
                name: order.offeredProduct.name,
                description: order.offeredProduct.description,
                price: order.offeredProduct.price,
                condition: order.offeredProduct.condition,
                type: order.offeredProduct.type,
                status: order.offeredProduct.status,
                location: order.offeredProduct.location,
                imageUrl: order.offeredProduct.imageUrl,
                createdAt: order.offeredProduct.createdAt
            } : null,
            pricing: {
                totalPrice: order.price,
                usedPoints: order.usedPoints,
                newPoints: order.newPoints,
                cashAmount: order.cashAmount
            },
            paymentMethod: order.paymentMethod
        };
        return {
            status: 'success',
            message: 'Order details fetched successfully',
            data: orderDetails
        };
    }
    async getUserOrders(userId) {
        const orders = await this.Order.find({
            where: { user: { id: userId } },
            relations: [
                'products',
                'user'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
        if (!orders.length) {
            return {
                status: 'success',
                message: 'No orders found',
                data: []
            };
        }
        const orderOverviews = orders.map(order => ({
            orderId: order.id,
            totalPrice: order.price,
            status: order.status,
            products: order.products.map(product => ({
                name: product.name
            }))
        }));
        return {
            status: 'success',
            message: 'Orders fetched successfully',
            data: orderOverviews
        };
    }
    async getReceivedOrders(sellerId) {
        const orders = await this.Order.find({
            where: {
                products: {
                    user: { id: sellerId }
                }
            },
            relations: [
                'products',
                'products.user',
                'user'
            ],
            order: {
                createdAt: 'DESC'
            }
        });
        if (!orders.length) {
            return {
                status: 'success',
                message: 'No orders found',
                data: []
            };
        }
        const orderOverviews = orders.map(order => ({
            orderId: order.id,
            customerName: `${order.user.firstName} ${order.user.lastName}`,
            totalPrice: order.price,
            status: order.status,
            products: order.products
                .filter(p => p.user.id === sellerId)
                .map(product => ({
                name: product.name
            }))
        }));
        return {
            status: 'success',
            message: 'Received orders fetched successfully',
            data: orderOverviews
        };
    }
    async updateOrderPaymentStatus(orderId, userId, newPaidStatus) {
        const order = await this.Order.findOne({
            where: { id: orderId },
            relations: ['user', 'products', 'products.user']
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const isSeller = order.products.some(product => product.user.id === userId);
        if (!isSeller) {
            throw new common_1.ForbiddenException('You are not authorized to update payment status for this order');
        }
        order.paidStatus = newPaidStatus;
        await this.Order.save(order);
        return {
            status: 'success',
            message: `Order payment status updated to ${newPaidStatus}`,
            data: {
                orderId: order.id,
                paidStatus: order.paidStatus
            }
        };
    }
};
exports.OrderService = OrderService;
__decorate([
    (0, typeorm_1.InjectRepository)(Order_1.Order),
    __metadata("design:type", typeorm_2.Repository)
], OrderService.prototype, "Order", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(Product_1.Product),
    __metadata("design:type", typeorm_2.Repository)
], OrderService.prototype, "Product", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(User_1.User),
    __metadata("design:type", typeorm_2.Repository)
], OrderService.prototype, "User", void 0);
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)()
], OrderService);
//# sourceMappingURL=order.service.js.map