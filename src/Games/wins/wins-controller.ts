import { Controller, Get, Query } from '@nestjs/common';
import { WinsService } from './wins.service';

@Controller('wins')
export class WinsController {
    constructor(private winsService: WinsService) {}

    @Get()
    async getCurrentWinRecord() {
        const wins = await this.winsService.getCurrentScore();

        return wins;
    }
}
