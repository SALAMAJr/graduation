import { Message } from './Message';
import { User } from './User';
export declare class Chat {
    id: string;
    chatName: string;
    participants: User[];
    messages: Message[];
    createdAt: Date;
}
