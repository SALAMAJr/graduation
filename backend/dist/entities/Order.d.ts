import { Product } from './Product';
import { User } from './User';
export declare enum orderType {
    purchase = "purchase",
    exchange = "exchange",
    exchange_plus_cash = "exchange_plus_cash"
}
export declare enum OrderStatus {
    PENDING = "pending",
    AWAITING_PAYMENT = "awaiting_payment",
    CONFIRMED = "confirmed",
    PROCESSING = "processing",
    AWAITING_SHIPMENT = "awaiting_shipment",
    SHIPPED = "shipped",
    COMPLETED = "completed",
    PARTIALLY_SHIPPED = "partially_shipped",
    RETURN_REQUESTED = "return_requested",
    RETURN_PROCESSING = "return_processing",
    RETURNED_COMPLETED = "returned_completed",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
export declare enum paid_status {
    paid = "paid",
    unpaid = "unpaid"
}
export declare enum paymentMethod {
    cash = "cash",
    card = "card",
    wallet = "wallet"
}
export declare enum shippingStatus {
    AWAITING_FULFILLMENT = "Awaiting Fulfillment",
    LABEL_CREATED = "Label Created",
    DISPATCHED_FOR_PICKUP = "Dispatched for Pickup",
    PICKED_UP = "Picked Up",
    LEFT_CARRIER_LOCATION = "Left Carrier Location",
    IN_TRANSIT = "In Transit",
    ARRIVED_AT_LOCAL_DELIVERY_FACILITY = "Arrived at Local Delivery Facility",
    OUT_FOR_DELIVERY = "Out for Delivery",
    AVAILABLE_FOR_PICKUP = "Available for Pickup",
    DELIVERY_ATTEMPTED = "Delivery Attempted",
    DELIVERED = "Delivered",
    RETURNED_TO_SENDER = "Returned to Sender",
    CANCELLED = "Cancelled",
    DELAYED = "Delayed",
    LOST = "Lost",
    target_Product_DELIVERED__offered_Produc_PICKED_UP = "P1 Delivered, P2 Pending Pickup",
    offeredProduc_IN_TRANSIT_TO_SELLER = "Product2 In Transit to Seller",
    offeredProduc_ARRIVED_AT_SELLER_LOCAL_FACILITY = "Product2 Arrived at Seller Local Facility",
    offeredProduc_OUT_FOR_DELIVERY_TO_SELLER = "Product2 Out for Delivery to Seller",
    EXCHANGE_COMPLETED_ALL_PRODUCTS_DELIVERED = "Exchange Completed - All Products Delivered"
}
export declare class Order {
    id: string;
    price: number;
    type: orderType;
    status: OrderStatus;
    paymentMethod: paymentMethod;
    cashAmount?: number;
    usedPoints: number;
    newPoints: number;
    deliveryman: User;
    paidStatus: paid_status;
    shippingStatus: shippingStatus;
    createdAt: Date;
    cancelledAt: Date;
    shippedAt: Date;
    deliveredAt: Date;
    confirmedAt: Date;
    offeredProduct?: Product;
    user: User;
    products: Product[];
}
