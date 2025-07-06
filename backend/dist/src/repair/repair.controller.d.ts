import { RepairService } from './repair.service';
import { RepairStatus } from 'entities/Repair';
export declare class RepairController {
    private readonly repairService;
    constructor(repairService: RepairService);
    getAllRepairs(req: Request): Promise<{
        status: string;
        message: string;
        repairs: import("entities/Repair").Repair[];
    }>;
    makeRepairReq(products: string[], cost: string, workshopId: string, req: Request): Promise<{
        status: string;
        message: string;
        data: import("entities/Repair").Repair;
    }>;
    updateRepiarReq(repairId: any, status: RepairStatus, req: Request): Promise<{
        status: string;
        message: string;
    }>;
    deleteRepairReq(repairId: string, req: Request): Promise<{
        status: string;
        message: string;
        deletedRepair: import("entities/Repair").Repair;
    }>;
}
