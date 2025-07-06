import { FirebaseService } from './firebase.service';
export declare class FirebaseController {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    sendNotification(sendNotificationDto: {
        title: string;
        body: string;
        token: string;
    }): Promise<{
        status: string;
        message: string;
        response: string;
    }>;
}
