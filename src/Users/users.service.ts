import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
        const keaton: User = {
            id: 0,
            name: "Keaton"
        }

        const chris: User = {
            id: 0,
            name: "Chris"
        }

        this.usersRepository.save(keaton).then(() => {
            console.log('Added keaton');
        }).catch(err => {
            console.log(`Could not save Keaton ${err}`);
        })

        this.usersRepository.save(chris).then(() => {
            console.log('Added Chris');
        }).catch(err => {
            console.log(`Could not save Chris ${err}`);
        })
    }
}