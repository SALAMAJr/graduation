import { Product } from 'entities/Product';
import { Repair, RepairStatus } from 'entities/Repair';
import { User } from 'entities/User';
import { Repository } from 'typeorm';
export declare class RepairService {
    private readonly Repair;
    private readonly Product;
    private readonly User;
    constructor(Repair: Repository<Repair>, Product: Repository<Product>, User: Repository<User>);
    getAllRepairs(userId: string): Promise<{
        status: string;
        message: string;
        repairs: Repair[];
    }>;
    makeRepairReq(products: string[], cost: string, userId: string, workshopId: string): Promise<{
        status: string;
        message: string;
        data: Repair;
    }>;
    updateRepairReq(userId: string, repairId: string, status: RepairStatus): Promise<{
        status: string;
        message: string;
    }>;
    deleteRepair(userId: string, repairId: string): Promise<{
        status: string;
        message: string;
        deletedRepair: Repair;
    }>;
}
