import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { MessageService } from 'src/message/message.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';
export declare class ChatGatwayGateway {
    private chatService;
    private messageService;
    private firebaseService;
    private userService;
    private redisClient;
    constructor(chatService: ChatService, messageService: MessageService, firebaseService: FirebaseService, userService: UserService);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleMessage(client: Socket, payload: {
        receiverId: string;
        content: string;
    }): Promise<void>;
}
