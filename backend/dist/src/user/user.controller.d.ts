import { UserService } from './user.service';
import { UpdateFcmTokenDto } from './dtos/UpdateFcmToken.dto';
import { UpdateUserDetailsDto } from './dtos/updateUserDetails';
import { MulterS3File } from './interface/multer-s3.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateFcmToken(req: Request, updateFcmToken: UpdateFcmTokenDto): Promise<{
        status: string;
        message: string;
    }>;
    updateUserDetails(req: Request, updateUserDetails: UpdateUserDetailsDto, file: MulterS3File): Promise<{
        status: string;
        message: string;
        data: import("../../entities/User").User;
    }>;
    getUserDetails(req: Request, id: string): Promise<import("../../entities/User").User>;
}
