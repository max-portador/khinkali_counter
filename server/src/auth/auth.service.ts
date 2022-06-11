import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {IUserDetail, UserService} from "../user/user.service";
import {NewUserDTO} from "../user/dto/new-user.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async hashPassword(password: string): Promise<string>{
        return bcrypt.hash(password, 12)
    }

    async register(user: Readonly<NewUserDTO>): Promise<IUserDetail | string | null>{
        const {name, password, email} = user;

        const existingUser = await this.userService.findByEmail(email);
        if (existingUser) return 'Email занят!';

        const hashedPassword = await this.hashPassword(password);
        const newUser = await this.userService.create(name, email, hashedPassword);
        return this.userService._getUserDetail(newUser);
    }
}
