import { User } from './User';
import { Product } from './Product';
export declare class Review {
    id: string;
    rating: number;
    comment: string;
    user: User;
    product: Product;
    createdAt: Date;
}
