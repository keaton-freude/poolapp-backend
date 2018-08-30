import { Controller, Get } from "@nestjs/common";
import { GameDataService } from "./game-data.service";

@Controller('game-data')
export class GameDataController {
    constructor(private gameDataService: GameDataService) {

    }

    @Get()
    async getAllGames() {
        let games = await this.gameDataService.getAllGames();

        return games;
    }
}