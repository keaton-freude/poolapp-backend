import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '../../node_modules/@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, MoreThan } from '../../node_modules/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        // make sure the correct users are loaded
        this.getUser('Chris').then((result) => {
            console.log(`Checking for chris result: ${JSON.stringify(result)}`);
            if (result === undefined) {
                console.log('We need to create the Chris user.');
                const user = new User();
                user.username = "Chris";
                this.userRepository.save(user);
            }
        }).catch(err => {
            console.log(`Checking for Chris error: ${err}`);
        });

        this.getUser('Keaton').then((result) => {
            console.log(`Checking for keaton result: ${JSON.stringify(result)}`);
            console.log('We need to create the Keaton user.');
            const user = new User();
            user.username = "Keaton";
            this.userRepository.save(user);
        }).catch(err => {
            console.log(`Checking for Keaton error: ${err}`);
        });
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(key: string | number): Promise<User> {
        if (typeof key === 'number') {
            return this.userRepository.findOne(key);
        } else if (typeof key === 'string') {
            return this.userRepository.findOne({ username: key });
        }
    }

    getUsers<T extends number | string>(...ids: T[]): Promise<User>[] {
        return ids.map(e => this.getUser(e));
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

    async getNumberWins(username: string, id: number = 0): Promise<number> {
        try {
            // const user = await this.userRepository.findOne({
            //     where: {
            //         username,
            //         id: MoreThan(id),
            //     },
            // });
            // return user.winningScores.length;
            // const scores = await this.
        } catch (e) {
            console.log(
                `Failed to get number of wins for user ${username}. ${e}`,
            );
            return 0;
        }
    }

    // async getNumberWinsById(userId: number, id: number = 0): Promise<number> {
    //     try {
    //         const user = await this.userRepository.findOne({
    //             where: {

    //             }
    //         })
    //     }
    // }
}
