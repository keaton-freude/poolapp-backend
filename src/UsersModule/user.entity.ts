import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Score } from 'Games/scores/score.entity';
import { GameData } from 'Games/game-data/gamedata.entity';

@Entity()
export class User {
    constructor() {
        this.hash = "NONE";
    }
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    username: string;

    @Column()
    hash: string;

    @OneToMany(Type => Score, score => score.winner)
    winningScores?: Score[];

    @OneToMany(Type => Score, score => score.breaker)
    breakingScores?: Score[];

    @OneToMany(Type => Score, score => score.stripes)
    stripesScores?: Score[];

    @OneToMany(Type => Score, score => score.solids)
    solidsScores?: Score[];

    @OneToMany(Type => GameData, gameData => gameData.winner)
    winningGames?: GameData[];
}
