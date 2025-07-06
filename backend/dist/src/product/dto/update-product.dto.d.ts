import { ConditionType, ProductCategories, ProductType } from 'entities/Product';
export declare enum ProductStatusWithoutSold {
    AVAILABLE = "available",
    ON_HOLD = "on_hold"
}
export declare class UpdateProductDto {
    name?: string;
    price?: number;
    description?: string;
    type?: ProductType;
    staus: ProductStatusWithoutSold;
    category?: ProductCategories;
    location?: string;
    condition?: ConditionType;
}
