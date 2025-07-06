import { Address } from './Address';
import { Order } from './Order';
import { Review } from './review';
import { Product } from './Product';
import { Message } from './Message';
import { SearchHistory } from './SearchHistory';
import { Repair } from './Repair';
export declare enum Roles {
    User = "user",
    Admin = "admin",
    Workshop = "workshop",
    Delivery = "delivery"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    image: string;
    points: number;
    firstName: string;
    lastName: string;
    status: boolean;
    phone: string;
    fcmToken: string;
    dateOfBirth: Date;
    role: Roles;
    isOAuthUser: boolean;
    products: Product[];
    addresses: Address[];
    orders: Order[];
    deliveryOrders: Order[];
    review: Review[];
    messages: Message[];
    searchHistories: SearchHistory[];
    repair: Repair[];
}
