import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameData } from "./gamedata.entity";
import { Repository } from "typeorm";
import { OverallScore } from "./overall-score";

@Injectable()
export class GameDataService {
    constructor(@InjectRepository(GameData) private readonly gameDataRepository: Repository<GameData>) { }

    getAllGames(): Promise<GameData[]> {
        return this.gameDataRepository.find();
    }

    async getCurrentGameId(): Promise<number> {
        // We can find the current id, by checking the game data repository.
        // Two cases: Its empty, or not.

        // If empty, then the id is zero, i.e. no games played yet
        // Otherwise, the last row in the table will tell us what id
        let lastGame = await this.gameDataRepository.findOne(null, {
            order: {
                id: "DESC"
            }
        });

        let id = 0;

        if (lastGame !== undefined) {
            id = lastGame.startId;
        }

        return id;
    }

    async getOverallScore(): Promise<OverallScore> {
        let games = await this.gameDataRepository.find();

        let chrisWins = games.filter(game => game.winner === "Chris").length;
        let keatonWins = games.filter(game => game.winner === "Keaton").length;

        return new OverallScore(chrisWins, keatonWins);
    }
}