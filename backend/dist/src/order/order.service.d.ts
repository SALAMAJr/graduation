import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus, orderType, paid_status, shippingStatus } from 'entities/Order';
import { ProductStatus } from 'entities/Product';
import { User } from 'entities/User';
export declare class OrderService {
    private Order;
    private Product;
    private User;
    create(createOrderDto: CreateOrderDto, userId: string): Promise<{
        status: string;
        message: string;
        data: Order;
    }>;
    findAll(userId: string): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: Order[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: Order;
    }>;
    removeProductFromOrder(productId: string, orderId: string, userId: string): Promise<{
        status: string;
        message: string;
        data: Order;
    }>;
    delete(id: string, userId: string): Promise<void>;
    private checkId;
    updateOrderStatus(orderId: string, userId: string, status: OrderStatus): Promise<Order>;
    delverymanAcceptOrder(orderId: string, deliveryman: User): Promise<{
        data: Order;
    }>;
    updateDeliveryStatus(orderId: string, deliverymanId: string, newShippingStatus: shippingStatus): Promise<{
        status: string;
        message: string;
        data: Order;
    }>;
    findAvailableOrdersForDelivery(): Promise<{
        status: string;
        message: string;
        data: Order[];
    }>;
    getOrderDetails(orderId: string): Promise<{
        status: string;
        message: string;
        data: {
            orderId: string;
            orderType: orderType;
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
                category: import("entities/Product").ProductCategories;
                condition: import("entities/Product").ConditionType;
                type: import("entities/Product").ProductType;
                status: ProductStatus;
                location: string;
                imageUrl: string;
                createdAt: Date;
            }[];
            offeredProduct: {
                id: string;
                name: string;
                description: string;
                price: number;
                condition: import("entities/Product").ConditionType;
                type: import("entities/Product").ProductType;
                status: ProductStatus;
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
    getUserOrders(userId: string): Promise<{
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
    getReceivedOrders(sellerId: string): Promise<{
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
    updateOrderPaymentStatus(orderId: string, userId: string, newPaidStatus: paid_status): Promise<{
        status: string;
        message: string;
        data: {
            orderId: string;
            paidStatus: paid_status;
        };
    }>;
}
