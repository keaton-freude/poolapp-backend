import { Controller, Get, Query } from '@nestjs/common';
import { ScoresService } from './scores-service';

@Controller('wins')
export class WinsController {
    constructor(private scoresService: ScoresService) { }

    @Get()
    async getCurrentWinRecord() {
        let wins = await this.scoresService.getCurrentScore();

        return wins;
    }
}
