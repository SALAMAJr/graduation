"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const Chat_1 = require("../../entities/Chat");
const User_1 = require("../../entities/User");
let ChatService = class ChatService {
    constructor(chatRepository, userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }
    async create(createChatDto, requesterId) {
        if (requesterId === createChatDto.recepientId) {
            throw new common_1.HttpException('You cannot create a chat with yourself', common_1.HttpStatus.FORBIDDEN);
        }
        const chatName = `chats${requesterId < createChatDto.recepientId ? requesterId + '_' + createChatDto.recepientId : createChatDto.recepientId + '_' + requesterId}`;
        const existingChat = await this.chatRepository.findOne({
            where: {
                chatName,
            },
        });
        if (existingChat) {
            throw new common_1.HttpException('Chat already exists', common_1.HttpStatus.FORBIDDEN);
        }
        const existingParticipant = await this.userRepository.findOne({
            where: { id: createChatDto.recepientId },
        });
        if (!existingParticipant) {
            throw new common_1.HttpException('Recipient does not exist, make sure to pass correct recipient user', common_1.HttpStatus.NOT_FOUND);
        }
        const chat = this.chatRepository.create({
            participants: [{ id: requesterId }, { id: createChatDto.recepientId }],
            chatName,
        });
        await this.chatRepository.save(chat);
        return {
            status: 'success',
            message: 'Chat created successfully',
            data: { ...chat },
        };
    }
    findAll() {
        return `This action returns all chat`;
    }
    async findOne(senderId, createChatDto, returnMessages = false) {
        if (senderId === createChatDto.recepientId) {
            throw new common_1.HttpException('You cannot create a chat with yourself', common_1.HttpStatus.FORBIDDEN);
        }
        const chatName = `chats${senderId < createChatDto.recepientId ? senderId + '_' + createChatDto.recepientId : createChatDto.recepientId + '_' + senderId}`;
        let chat = await this.chatRepository.findOne({
            where: {
                chatName,
            },
        });
        if (!chat) {
            return false;
        }
        if (returnMessages) {
            chat = await this.chatRepository
                .createQueryBuilder('chat')
                .leftJoinAndSelect('chat.participants', 'participant')
                .leftJoinAndSelect('chat.messages', 'message')
                .leftJoin('message.sender', 'sender')
                .addSelect([
                'message.id',
                'message.message',
                'message.createdAt',
                'sender.id',
            ])
                .where('chat.id = :id', { id: chat.id })
                .getOne();
            return {
                status: 'success',
                message: 'Chat found successfully',
                data: { ...chat },
            };
        }
        return {
            status: 'success',
            message: 'Chat found successfully',
            data: { ...chat },
        };
    }
    update(id, updateChatDto) {
        return `This action updates a #${id} chat`;
    }
    async findManyByUserId(userId) {
        let chats = await this.chatRepository.find({
            where: {
                participants: {
                    id: userId,
                },
            },
            select: ['id'],
        });
        if (!chats.length) {
            return {
                status: 'success',
                message: 'No chats found',
            };
        }
        chats = await this.chatRepository.find({
            where: { id: (0, typeorm_1.In)([...chats.map((chat) => chat.id)]) },
            relations: ['participants'],
        });
        console.log('chats', chats);
        const chatDetails = chats.map((chat) => {
            return {
                chatId: chat.id,
                receiverId: chat.participants.find((participant) => participant.id !== userId).id,
            };
        });
        return {
            status: 'success',
            message: 'Chats fetched successfully',
            data: { ...chatDetails },
        };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(Chat_1.Chat)),
    __param(1, (0, typeorm_2.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map