import { Injectable } from '@nestjs/common';
import { ScoresService } from '../scores/scores-service';
import { CurrentScoreModel } from '../scores/current-score.model';

@Injectable()
export class WinsService {
    constructor(private scoresService: ScoresService) {}

    getCurrentScore(): Promise<CurrentScoreModel> {
        return this.scoresService.getCurrentScore();
    }
}
