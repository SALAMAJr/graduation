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
exports.ChatGatwayGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("../chat.service");
const message_service_1 = require("../../message/message.service");
const redis_1 = require("redis");
const firebase_service_1 = require("../../firebase/firebase.service");
const user_service_1 = require("../../user/user.service");
let ChatGatwayGateway = class ChatGatwayGateway {
    constructor(chatService, messageService, firebaseService, userService) {
        this.chatService = chatService;
        this.messageService = messageService;
        this.firebaseService = firebaseService;
        this.userService = userService;
        this.redisClient = (0, redis_1.createClient)({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        });
        this.redisClient.connect().catch((err) => {
            console.error('Redis connection failed', err);
        });
    }
    async handleConnection(client) {
        const userId = client.handshake.headers.auth;
        if (!userId) {
            client.emit('error', { message: 'Authentication header missing' });
            client.disconnect();
            throw new websockets_1.WsException('Authentication header missing');
        }
        else {
            client['user'] = userId;
            await this.redisClient.set(`user:${userId}:socketId`, client.id);
            await this.redisClient.set(`user:${userId}:status`, 'online');
            console.log('Socket created successfully');
        }
    }
    async handleDisconnect(client) {
        const userId = client['user'];
        if (userId) {
            await this.redisClient.del(`user:${userId}:socketId`);
            await this.redisClient.set(`user:${userId}:status`, 'offline');
            console.log('Socket deleted successfully');
        }
        console.log('Client disconnected:', client.id);
    }
    async handleMessage(client, payload) {
        const { receiverId, content } = payload;
        const userId = client['user'];
        const senderSocket = (await this.redisClient.get(`user:${userId}:socketId`));
        const receiverSocket = (await this.redisClient.get(`user:${receiverId}:socketId`));
        if (userId === receiverId) {
            client.emit('error', {
                message: 'You cannot send a message to yourself',
            });
            throw new websockets_1.WsException('Cannot message self');
        }
        let chat = await this.chatService.findOne(userId, {
            recepientId: receiverId,
        });
        if (!chat) {
            client.emit('error', {
                message: "Can't send message into uncreated chat please create chat first",
            });
            throw new websockets_1.WsException("Can't send message into uncreated chat please create chat first");
        }
        if (receiverSocket) {
            this.server.to(receiverSocket).emit('message', {
                senderId: userId,
                content,
            });
        }
        else {
            const receiverUser = await this.userService.findOne(receiverId);
            if (!receiverUser) {
                client.emit('error', {
                    message: 'Receiver not found',
                });
                throw new websockets_1.WsException('Receiver not found');
            }
            const notification = await this.firebaseService.sendNotification(receiverUser.fcmToken, 'New message', content, {
                senderId: userId,
                chatId: chat.data.id,
            });
        }
        const message = await this.messageService.create({
            message: content,
            chatId: chat.data.id,
        }, userId);
    }
};
exports.ChatGatwayGateway = ChatGatwayGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGatwayGateway.prototype, "server", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGatwayGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGatwayGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGatwayGateway.prototype, "handleMessage", null);
exports.ChatGatwayGateway = ChatGatwayGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, { cors: '*' }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        message_service_1.MessageService,
        firebase_service_1.FirebaseService,
        user_service_1.UserService])
], ChatGatwayGateway);
//# sourceMappingURL=chat-gateway.gateway.js.map