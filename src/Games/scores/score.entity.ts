import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from 'UsersModule/user.entity';

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => User, user => user.winningScores)
    winner: User;

    @ManyToOne(type => User, user => user.breakingScores)
    breaker: User;

    @ManyToOne(type => User, user => user.stripesScores)
    stripes: User;

    @ManyToOne(type => User, user => user.solidsScores)
    solids: User;

    @Column()
    beatSelf: boolean;

    @Column()
    easyPocket: boolean;

    @Column()
    ballsLeft: number;
}
