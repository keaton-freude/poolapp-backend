import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameData } from './gamedata.entity';
import { Repository } from 'typeorm';
import { OverallScore } from './overall-score';
import { User } from 'UsersModule/user.entity';

@Injectable()
export class GameDataService {
    constructor(@InjectRepository(GameData) private readonly gameDataRepository: Repository<GameData>) {}

    getAllGames(): Promise<GameData[]> {
        return this.gameDataRepository.find();
    }

    async getCurrentGameId(): Promise<number> {
        // We can find the current id, by checking the game data repository.
        // Two cases: Its empty, or not.

        // If empty, then the id is zero, i.e. no games played yet
        // Otherwise, the last row in the table will tell us what id
        const lastGame = await this.gameDataRepository.findOne(null, {
            order: {
                id: 'DESC',
            },
        });

        console.log(`${JSON.stringify(lastGame)}`);

        let id = 0;

        if (lastGame !== undefined) {
            console.log('ID was not null!');
            id = lastGame.endId;
        }

        return id;
    }

    async getOverallScore(): Promise<OverallScore> {
        const games = await this.gameDataRepository.find();

        const chrisWins = games.filter(game => game.winner.username === 'Chris').length;
        const keatonWins = games.filter(game => game.winner.username === 'Keaton').length;

        return new OverallScore(chrisWins, keatonWins);
    }

    async submitWin(user: User, endId: number): Promise<any> {
        const game = new GameData();
        game.winner = user;
        game.endId = endId;
        await this.gameDataRepository.save(game);
    }
}
