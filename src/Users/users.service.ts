import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from '../../node_modules/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getUsers(id?: string): Promise<any> {
        if (id) {
            return await this.userRepository.findOne(id);
        }
        return await this.userRepository.find();
    }

    async createUser(username: string, password: string) {
        // make sure user doesn't exist. create bcrypt hash
        await this.checkForValidCredentials(username, password);

        bcrypt.hash(password, 10, async (err, hash) => {
            // username, hash-password, phone, etc...
            const user: User = { username: username, hash: hash };
            await this.userRepository.save(user);
        });
    }

    async checkForValidCredentials(username: string, password: string) {
        // make sure user doesn't exist
        // make sure username is not empty
        // make sure password is not empty
    }

    async validateUser(username: string, password: string) {
        // check hash against user in db
    }
}
