import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'UsersModule/user.entity';

@Entity()
export class GameData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    endId: number;

    @ManyToOne(type => User, user => user.winningGames, { eager: true })
    winner: User;
}
