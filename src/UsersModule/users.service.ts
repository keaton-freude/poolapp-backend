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

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    getUsers(...ids: number[]): Promise<User>[] {
        const test = ids.map(e => {
            return this.getUser(e);
        });

        return test;
    }

    async createUser(username: string, password: string) {
        // make sure user doesn't exist. create bcrypt hash
        await this.checkForValidCredentials(username, password);

        bcrypt.hash(password, 10, async (err, hash) => {
            await this.userRepository.save({ username, hash });
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
