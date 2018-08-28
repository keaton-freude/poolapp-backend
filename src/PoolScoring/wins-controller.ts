import { Controller, Get, Query } from '@nestjs/common';
import { ScoresService } from './scores-service';

@Controller('wins')
export class WinsController {
    constructor(private scoresService: ScoresService) {}

    @Get()
    async getWinsSinceId(@Query('id') id: number) {
        // tslint:disable-next-line:no-console
        console.log(
            `Getting the number of wins since id ${id} for both Keaton and Chris`,
        );

        const wins = await this.scoresService.GetWinsPerUserSinceId(0);
        return wins;
    }
}
