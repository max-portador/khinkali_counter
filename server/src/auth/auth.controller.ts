import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {NewUserDTO} from "../user/dto/new-user.dto";
import {IUserDetail} from "../user/user.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    register(@Body() user: NewUserDTO): Promise<IUserDetail | string | null>{
        return this.authService.register(user);
    }
}
