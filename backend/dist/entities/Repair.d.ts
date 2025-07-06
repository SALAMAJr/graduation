import { User } from "./User";
import { Product } from "./Product";
export declare enum RepairStatus {
    Pending = "pending",
    Accepted = "accepted",
    Rejected = "rejected",
    Fullfilled = "fullfilled",
    cancelled = "cancelled"
}
export declare enum PaymentStatus {
    Unpaid = "unpaid",
    Pending = "pending",
    Paid = "paid"
}
export declare enum PaymentMethod {
    Paypal = "paypal",
    Payoneer = "payoneer",
    Cash = "cash",
    Card = "card"
}
export declare class Repair {
    repairId: string;
    status: RepairStatus;
    cost: string;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
    createdAt: string;
    updatedAt: string;
    user: User;
    workshop: User;
    products: Product[];
}
