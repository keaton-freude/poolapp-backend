import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { Repository, MoreThan } from 'typeorm';
import { AddScoreModel } from './add-score.model';
import { CurrentScoreModel } from './current-score.model';
import { GameDataService } from '../game-data/game-data.service';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>,
        private readonly gameDataService: GameDataService,
    ) {}

    async getAllScores(): Promise<Score[]> {
        return this.scoresRepository.find();
    }

    async addScore(addScoreModel: AddScoreModel) {
        const score: any = {
            winner: addScoreModel.winner,
            breaker: addScoreModel.breaker,
            ballsLeft: addScoreModel.ballsLeft,
            beatSelf: addScoreModel.beatSelf,
            easyPocket: addScoreModel.easyPocket,
            solids: addScoreModel.solids,
            stripes: addScoreModel.stripes,
        };
        await this.scoresRepository.save(score);
    }

    async getCurrentScore(): Promise<CurrentScoreModel> {
        const id = await this.gameDataService.getCurrentGameId();

        console.log(`Id: ${id}`);

        const wins = this.getWinsPerUserSinceId(id);

        return wins;
    }

    async getWinsPerUserSinceId(id: number): Promise<CurrentScoreModel> {
        // Get the number of wins for Keaton, Then Chris
        const keatonWins = await this.scoresRepository.find({
            id: MoreThan(id),
            winner: 'Keaton',
        });

        const chrisWins = await this.scoresRepository.find({
            id: MoreThan(id),
            winner: 'Chris',
        });

        return {
            chrisWins: chrisWins.length,
            keatonWins: keatonWins.length,
        };
    }
}
