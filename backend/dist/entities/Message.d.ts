import { User } from './User';
import { Chat } from './Chat';
export declare class Message {
    id: string;
    message: string;
    createdAt: Date;
    sender: User;
    chat: Chat;
}
