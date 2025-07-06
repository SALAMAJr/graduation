import { User } from 'entities/User';
import { Repository } from 'typeorm';
import { UpdateFcmTokenDto } from './dtos/UpdateFcmToken.dto';
import { UpdateUserDetailsDto } from './dtos/updateUserDetails';
export declare class UserService {
    private UserRepository;
    constructor(UserRepository: Repository<User>);
    findOne(id: string): Promise<User>;
    updateFcmToken(updateFcmToken: UpdateFcmTokenDto, userId: string): Promise<{
        status: string;
        message: string;
    }>;
    updateUserDetails(updateUserDetails: UpdateUserDetailsDto, userId: string, image?: any): Promise<{
        status: string;
        message: string;
        data: User;
    }>;
}
