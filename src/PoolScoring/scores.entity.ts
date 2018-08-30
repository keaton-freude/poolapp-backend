import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'Users/user.entity';

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    winner: string;

    @Column()
    breaker: string;

    @Column()
    stripes: string;

    @Column()
    solids: string;

    @Column()
    beatSelf: boolean;

    @Column()
    easyPocket: boolean;

    @Column()
    ballsLeft: number;
}
