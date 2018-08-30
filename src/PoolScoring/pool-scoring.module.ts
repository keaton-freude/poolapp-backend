import { Module } from '@nestjs/common';
import { ScoresController } from './scores-controller';
import { ScoresService } from './scores-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './scores.entity';
import { WinsController } from './wins-controller';
import { GameDataController } from './game-data.controller';
import { GameDataService } from './game-data.service';
import { GameData } from './gamedata.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Score, GameData])],
    controllers: [ScoresController, WinsController, GameDataController],
    providers: [ScoresService, GameDataService],
})
export class PoolScoringModule { }
