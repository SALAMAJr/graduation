import { ConditionType, ProductCategories, ProductStatus, ProductType } from 'entities/Product';
export declare class CreateProductDto {
    name: string;
    price: number;
    description: string;
    category: ProductCategories;
    type: ProductType;
    condition: ConditionType;
    status: ProductStatus;
}
