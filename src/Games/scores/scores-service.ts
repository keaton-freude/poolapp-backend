import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { Repository, MoreThan } from 'typeorm';
import { AddScoreModel } from './add-score.model';
import { CurrentScoreModel } from './current-score.model';
import { GameDataService } from '../game-data/game-data.service';
import { UserService } from 'UsersModule/users.service';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score) private readonly scoresRepository: Repository<Score>,
        private readonly gameDataService: GameDataService,
        private readonly usersService: UserService,
    ) {}

    async getAllScores(): Promise<Score[]> {
        return this.scoresRepository.find();
    }

    async addScore(addScore: AddScoreModel) {
        console.log(`${JSON.stringify(addScore)}`);
        const [winner, breaker, stripes, solids] = await Promise.all(
            this.usersService.getUsers(addScore.winner, addScore.breaker, addScore.stripes, addScore.solids),
        );

        const score: Score = {
            winner,
            breaker,
            ballsLeft: addScore.ballsLeft,
            beatSelf: addScore.beatSelf,
            easyPocket: addScore.easyPocket,
            solids,
            stripes,
        };

        await this.scoresRepository.save(score);

        // Determine if someone has won a game (their current score is greater than or equal to 50)
        // Only check the winner of the currently submitted game
        const currentScore = await this.getCurrentScore();
    }

    async getCurrentScore(): Promise<CurrentScoreModel> {
        const id = await this.gameDataService.getCurrentGameId();
        console.log(`Current game ID is ${id}`);
        const wins = this.getWinsPerUserSinceId(id);

        return wins;
    }

    // async getCurrentNumberWins(userId: number, id: number): Promise<number> {
    //     return await this.usersService.getNumberWins(userId, id);
    // }

    async getWinsPerUserSinceId(id: number): Promise<CurrentScoreModel> {
        // Figure out the IDs for Chris and Keaton
        const [chris, keaton] = await Promise.all(this.usersService.getUsers('Keaton', 'Chris'));
        const [chrisWins, keatonWins] = await Promise.all(this.getWinsForManyUsersSinceId(id, chris.id, keaton.id));

        return {
            chrisWins,
            keatonWins,
        };
    }

    getWinsForManyUsersSinceId(id: number, ...userIds: number[]): Promise<number>[] {
        return userIds.map(e => {
            return this.getWinsForUserSinceId(e, id);
        });
    }

    async getWinsForUserSinceId(userId: number, id: number): Promise<number> {
        const result = await this.scoresRepository.count({
            where: {
                winner: {
                    id: userId,
                },
                id: MoreThan(id),
            },
        });

        return result;
    }
}
