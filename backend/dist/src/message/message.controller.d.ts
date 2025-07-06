import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Request } from 'express';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(req: Request, createMessageDto: CreateMessageDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            message: string;
            createdAt: Date;
            sender: import("../../entities/User").User;
            chat: import("../../entities/Chat").Chat;
        };
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMessageDto: UpdateMessageDto): string;
    remove(id: string): string;
}
