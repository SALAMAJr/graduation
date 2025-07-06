import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductType } from 'entities/Product';
import { Repository } from 'typeorm';
import { SearchHistoryService } from 'src/search-history/search-history.service';
import { SearchHistory } from 'entities/SearchHistory';
export declare class ProductService {
    private readonly ProductRepository;
    private readonly SearchHistoryRepository;
    private readonly searchHistoryService;
    constructor(ProductRepository: Repository<Product>, SearchHistoryRepository: Repository<SearchHistory>, searchHistoryService: SearchHistoryService);
    private readonly apiUrl;
    create(createProductDto: CreateProductDto, userId: string, image: any): Promise<{
        status: string;
        message: string;
        data: {
            product: Product;
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
            products: Product[];
        };
    }>;
    findAllProductByUser(userId: string): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            products: Product[];
        };
    }>;
    myListings(userId: string, page?: number, limit?: number): Promise<{
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            products: Product[];
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
            products: Product[];
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
            product: Product;
        };
    }>;
    update(id: string, updateProductDto: UpdateProductDto, userId: string, image?: any): Promise<{
        status: string;
        message: string;
        data: {
            updatedProduct: Product;
        };
    }>;
    searchProducts(query: string, page?: number, limit?: number, userId?: string, saveSearchHistory?: boolean): Promise<{
        status: string;
        message: string;
        data: {
            products: Product[];
        };
    }>;
    remove(id: string, userId: string): Promise<{
        status: string;
        message: string;
    }>;
    homePageProducts(userId: string, page?: number, limit?: number): Promise<{
        status: string;
        message: string;
        data: {
            products: any[];
        };
    }>;
    private translateText;
    private detectLanguage;
}
