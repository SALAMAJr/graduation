import { Order } from './Order';
import { Review } from './review';
import { User } from './User';
import { Repair } from './Repair';
export declare enum ProductType {
    BUY = "buy",
    REPAIR = "repair",
    SWAP = "swap"
}
export declare enum ConditionType {
    New = "new",
    Used = "used",
    LikeNew = "likeNew"
}
export declare enum ProductStatus {
    AVAILABLE = "available",
    ON_HOLD = "on_hold",
    SOLD = "sold",
    Repaired = "repaired"
}
export declare enum PriceType {
    Fixed = "fixed",
    Negotiable = "negotiable"
}
export declare enum ProductCategories {
    LivingRoom = "Living Room",
    Bedroom = "Bedroom",
    DiningKitchen = "Dining & Kitchen",
    HomeOffice = "Home Office",
    OutdoorPatio = "Outdoor & Patio",
    KidsNursery = "Kids' & Nursery",
    StorageFurniture = "Storage Furniture",
    AccentFurniture = "Accent Furniture",
    SofasSectionals = "Sofas & Sectionals",
    BedsHeadboards = "Beds & Headboards",
    Tables = "Tables",
    Chairs = "Chairs",
    BookshelvesCabinets = "Bookshelves & Cabinets",
    DressersChests = "Dressers & Chests",
    TVStandsMediaConsoles = "TV Stands & Media Consoles",
    Desks = "Desks",
    OfficeChairs = "Office Chairs",
    PatioSets = "Patio Sets",
    DiningSets = "Dining Sets",
    Mattresses = "Mattresses",
    OtherFurniture = "Other Furniture"
}
export declare class Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    type: ProductType;
    condition: ConditionType;
    status: ProductStatus;
    category: ProductCategories;
    location: string;
    createdAt: Date;
    priceType: PriceType;
    user: User;
    order: Order;
    review: Review[];
    repair: Repair;
}
