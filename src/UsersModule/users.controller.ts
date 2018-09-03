import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('account')
    async createUser(username: string, password: string): Promise<any> {
        return this.userService.createUser(username, password);
    }

    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async getUsers(id?: string): Promise<any> {
        return await this.userService.getUsers(id);
    }
}
