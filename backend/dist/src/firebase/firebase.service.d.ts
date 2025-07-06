export declare class FirebaseService {
    private defaultApp;
    constructor();
    sendNotification(token: string, title: string, body: string, data?: any): Promise<{
        status: string;
        message: string;
        response: string;
    }>;
}
