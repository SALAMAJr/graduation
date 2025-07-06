import { Request } from 'express';
interface JwtPayload {
    sub: string;
    username: string;
    iat: number;
    exp: number;
}
export declare class TestController {
    getPublicData(): {
        message: string;
        timestamp: string;
    };
    getProtectedData(request: Request): {
        message: string;
        timestamp: string;
        user?: undefined;
    } | {
        message: string;
        user: JwtPayload;
        timestamp: string;
    };
}
export {};
