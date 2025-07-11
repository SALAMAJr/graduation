"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entities/User");
const Otp_1 = require("../entities/Otp");
const core_1 = require("@nestjs/core");
const Address_1 = require("../entities/Address");
const Order_1 = require("../entities/Order");
const Product_1 = require("../entities/Product");
const jwt_1 = require("@nestjs/jwt");
const address_module_1 = require("./address/address.module");
const order_module_1 = require("./order/order.module");
const review_module_1 = require("./review/review.module");
const review_1 = require("../entities/review");
const product_module_1 = require("./product/product.module");
const message_module_1 = require("./message/message.module");
const chat_module_1 = require("./chat/chat.module");
const Chat_1 = require("../entities/Chat");
const Message_1 = require("../entities/Message");
const firebase_module_1 = require("./firebase/firebase.module");
const SearchHistory_1 = require("../entities/SearchHistory");
const search_history_module_1 = require("./search-history/search-history.module");
const repair_module_1 = require("./repair/repair.module");
const Repair_1 = require("../entities/Repair");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '9d' },
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                synchronize: true,
                logging: true,
                entities: [
                    User_1.User,
                    Otp_1.Otp,
                    Address_1.Address,
                    Order_1.Order,
                    Product_1.Product,
                    review_1.Review,
                    Message_1.Message,
                    Chat_1.Chat,
                    SearchHistory_1.SearchHistory,
                    review_1.Review,
                    Repair_1.Repair,
                ],
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            address_module_1.AddressModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
            product_module_1.ProductModule,
            chat_module_1.ChatModule,
            message_module_1.MessageModule,
            firebase_module_1.FirebaseModule,
            search_history_module_1.SearchHistoryModule,
            repair_module_1.RepairModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    whitelist: true,
                }),
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map