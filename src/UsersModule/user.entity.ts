import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Score } from 'Games/scores/score.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    username: string;

    @Column()
    hash: string;

    @OneToMany(Type => Score, score => score.winner, { eager: true })
    winningScores?: Score[];

    @OneToMany(Type => Score, score => score.breaker)
    breakingScores?: Score[];

    @OneToMany(Type => Score, score => score.stripes)
    stripesScores?: Score[];

    @OneToMany(Type => Score, score => score.solids)
    solidsScores?: Score[];
}
