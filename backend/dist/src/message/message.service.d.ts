import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from 'entities/Message';
import { Repository } from 'typeorm';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    create(createMessageDto: CreateMessageDto, senderId: string): Promise<{
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
    findOne(id: number): string;
    update(id: number, updateMessageDto: UpdateMessageDto): string;
    remove(id: number): string;
}
