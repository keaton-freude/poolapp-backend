import { Module } from '@nestjs/common';
import { GameDataModule } from './game-data/game-data.module';
import { ScoresModule } from './scores/scores.module';
import { WinsModule } from './wins/wins.module';

@Module({
    imports: [GameDataModule, ScoresModule, WinsModule],
    controllers: [],
    providers: [],
})
export class GamesModule {}
