import { Get, Controller, Post, Body, Param } from '@nestjs/common';
import { ScoresService } from './scores-service';
import { AddScoreModel } from './add-score.model';

@Controller('scores')
export class ScoresController {
    constructor(private scoresService: ScoresService) {}

    @Get()
    async root() {
        const scores = await this.scoresService.getAllScores();
        return scores;
    }

    @Post()
    async create(@Body() addScore: AddScoreModel) {
        await this.scoresService.addScore(addScore);
    }
}
