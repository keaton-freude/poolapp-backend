import { Get, Controller, Post, Body, Param } from '@nestjs/common';
import { ScoresService } from './scores-service';
import { AddScoreModel } from './add-score.model';

@Controller('scores')
export class ScoresController {
    constructor(private scoresService: ScoresService) {}

    @Get()
    async root() {
        const scores = await this.scoresService.FindAllScores();
        return scores;
    }

    @Post()
    async create(@Body() addScore: AddScoreModel) {
        this.scoresService.addScore(addScore);
    }
}
