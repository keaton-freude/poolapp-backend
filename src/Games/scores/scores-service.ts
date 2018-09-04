import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { Repository, MoreThan } from 'typeorm';
import { AddScoreModel } from './add-score.model';
import { CurrentScoreModel } from './current-score.model';
import { GameDataService } from '../game-data/game-data.service';
import { UserService } from 'UsersModule/users.service';
import { User } from 'UsersModule/user.entity';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>,
        private readonly gameDataService: GameDataService,
        private readonly usersService: UserService,
    ) {}

    async getAllScores(): Promise<Score[]> {
        return this.scoresRepository.find();
    }

    async addScore(addScore: AddScoreModel) {
        const [winner, breaker, stripes, solids] = await Promise.all(
            this.usersService.getUsers(
                addScore.winner,
                addScore.breaker,
                addScore.stripes,
                addScore.solids,
            ),
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
    }

    async getCurrentScore(): Promise<CurrentScoreModel> {
        const id = await this.gameDataService.getCurrentGameId();
        const wins = this.getWinsPerUserSinceId(id);

        return wins;
    }

    async getWinsPerUserSinceId(id: number): Promise<CurrentScoreModel> {
        // Get the number of wins for Keaton, Then Chris
        const keatonWins = await this.scoresRepository.find({
            id: MoreThan(id),
            winner: { username: 'Keaton' },
        });

        const chrisWins = await this.scoresRepository.find({
            id: MoreThan(id),
            winner: { username: 'Chris' },
        });

        return {
            chrisWins: chrisWins.length,
            keatonWins: keatonWins.length,
        };
    }
}
