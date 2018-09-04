import { Controller, Get } from '@nestjs/common';
import { GameDataService } from './game-data.service';

@Controller('game-data')
export class GameDataController {
    constructor(private gameDataService: GameDataService) {}

    @Get()
    async getAllGames() {
        const games = await this.gameDataService.getAllGames();

        return games;
    }

    @Get('/overall-score')
    async getOverallScore() {
        const overallWins = await this.gameDataService.getOverallScore();
        return overallWins;
    }
}
