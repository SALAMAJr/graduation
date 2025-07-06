import { orderType, paymentMethod } from 'entities/Order';
export declare class CreateOrderDto {
    name: string;
    targetProductId: string[];
    offeredProductId?: string;
    type: orderType;
    paymentMethod: paymentMethod;
    cashAmount?: number;
    points?: number;
}
