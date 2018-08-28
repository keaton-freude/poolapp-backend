import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './scores.entity';
import { Repository, MoreThan } from 'typeorm';
import { AddScoreModel } from './add-score.model';
import { WinsPerUserModel } from './wins-per-user.model';

@Injectable()
export class ScoresService {
    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>,
    ) {}

    async FindAllScores(): Promise<Score[]> {
        return await this.scoresRepository.find();
    }

    async addScore(addScoreModel: AddScoreModel) {
        const score: Score = {
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

    async GetWinsPerUserSinceId(id: number): Promise<WinsPerUserModel> {
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
