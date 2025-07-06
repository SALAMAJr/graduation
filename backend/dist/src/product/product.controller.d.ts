import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { ProductType } from 'entities/Product';
import { MulterS3File } from '../user/interface/multer-s3.interface';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, req: Request, file: MulterS3File): Promise<{
        status: string;
        message: string;
        data: {
            product: import("entities/Product").Product;
        };
    }>;
    findAllProduct(): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            products: import("entities/Product").Product[];
        };
    }>;
    findAllProductByUser(req: Request): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            products: import("entities/Product").Product[];
        };
    }>;
    findAllProductByType(type: ProductType): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            products: import("entities/Product").Product[];
        };
    }>;
    findAvailableProducts(req: Request, page?: number, limit?: number): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            products: import("entities/Product").Product[];
        };
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            product: import("entities/Product").Product;
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto, req: Request, file: MulterS3File): Promise<{
        status: string;
        message: string;
        data: {
            updatedProduct: import("entities/Product").Product;
        };
    }>;
    search(query: string, page: number, limit: number, req: Request): Promise<{
        status: string;
        message: string;
        data: {
            products: import("entities/Product").Product[];
        };
    }>;
    home(req: Request, page?: number, limit?: number): Promise<{
        status: string;
        message: string;
        data: {
            products: any[];
        };
    }>;
    remove(id: string, req: Request): Promise<{
        status: string;
        message: string;
    }>;
}
