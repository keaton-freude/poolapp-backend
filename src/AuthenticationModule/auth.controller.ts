import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'UsersModule/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private userService: UserService,
    ) {}

    @Get('token')
    async login(username: string, password: string): Promise<any> {
        await this.userService.validateUser(username, password);
        return await this.authService.createToken();
    }
}
