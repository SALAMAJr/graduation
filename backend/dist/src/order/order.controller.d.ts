import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { OrderStatus, paid_status, shippingStatus } from 'entities/Order';
import { updateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, req: Request): Promise<{
        status: string;
        message: string;
        data: import("entities/Order").Order;
    }>;
    findAll(req: Request): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: import("entities/Order").Order[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: import("entities/Order").Order;
    }>;
    remove(req: Request, orderId: string, productId: string): Promise<{
        status: string;
        message: string;
        data: import("entities/Order").Order;
    }>;
    removeOrder(id: string, req: Request): Promise<void>;
    updateOrderStatus(orderId: string, Body: UpdateOrderStatusDto, req: any): Promise<{
        status: string;
        message: string;
        data: import("entities/Order").Order;
    }>;
    getUserOrders(req: Request): Promise<{
        status: string;
        message: string;
        data: {
            orderId: string;
            totalPrice: number;
            status: OrderStatus;
            products: {
                name: string;
            }[];
        }[];
    }>;
    getReceivedOrders(req: Request): Promise<{
        status: string;
        message: string;
        data: {
            orderId: string;
            customerName: string;
            totalPrice: number;
            status: OrderStatus;
            products: {
                name: string;
            }[];
        }[];
    }>;
    updateOrderPaymentStatus(orderId: string, status: paid_status, req: Request): Promise<{
        status: string;
        message: string;
        data: {
            orderId: string;
            paidStatus: paid_status;
        };
    }>;
    getOrderDetails(orderId: string): Promise<{
        status: string;
        message: string;
        data: {
            orderId: string;
            orderType: import("entities/Order").orderType;
            status: {
                orderStatus: OrderStatus;
                shippingStatus: shippingStatus;
                paidStatus: paid_status;
            };
            timestamps: {
                createdAt: Date;
                confirmedAt: Date;
                shippedAt: Date;
                deliveredAt: Date;
                cancelledAt: Date;
            };
            customerInfo: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                image: string;
                addresses: {
                    id: string;
                    fullName: string;
                    streetAddress: string;
                    city: string;
                    state: string;
                    country: string;
                    postalCode: string;
                    phoneNumber: string;
                }[];
            };
            deliveryInfo: {
                id: string;
                firstName: string;
                lastName: string;
                phone: string;
                image: string;
            };
            products: {
                id: string;
                name: string;
                description: string;
                price: number;
                category: import("../../entities/Product").ProductCategories;
                condition: import("../../entities/Product").ConditionType;
                type: import("../../entities/Product").ProductType;
                status: import("../../entities/Product").ProductStatus;
                location: string;
                imageUrl: string;
                createdAt: Date;
            }[];
            offeredProduct: {
                id: string;
                name: string;
                description: string;
                price: number;
                condition: import("../../entities/Product").ConditionType;
                type: import("../../entities/Product").ProductType;
                status: import("../../entities/Product").ProductStatus;
                location: string;
                imageUrl: string;
                createdAt: Date;
            };
            pricing: {
                totalPrice: number;
                usedPoints: number;
                newPoints: number;
                cashAmount: number;
            };
            paymentMethod: import("entities/Order").paymentMethod;
        };
    }>;
    acceptDeliveryOrder(orderId: string, req: Request): Promise<{
        data: import("entities/Order").Order;
    }>;
    updateDeliveryStatus(orderId: string, body: updateShipmentStatusDto, req: Request): Promise<{
        status: string;
        message: string;
        data: import("entities/Order").Order;
    }>;
    findAvailableOrdersForDelivery(): Promise<{
        status: string;
        message: string;
        data: import("entities/Order").Order[];
    }>;
}
