"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const Chat_1 = require("../../entities/Chat");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const User_1 = require("../../entities/User");
const Message_1 = require("../../entities/Message");
const chat_gateway_gateway_1 = require("./chat-gateway/chat-gateway.gateway");
const message_module_1 = require("../message/message.module");
const firebase_service_1 = require("../firebase/firebase.service");
const user_service_1 = require("../user/user.service");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([Chat_1.Chat, User_1.User, Message_1.Message]),
            jwt_1.JwtModule,
            message_module_1.MessageModule,
        ],
        controllers: [chat_controller_1.ChatController],
        providers: [chat_service_1.ChatService, chat_gateway_gateway_1.ChatGatwayGateway, firebase_service_1.FirebaseService, user_service_1.UserService],
        exports: [chat_service_1.ChatService],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map