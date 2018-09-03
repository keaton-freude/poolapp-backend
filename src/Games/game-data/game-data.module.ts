import { Module } from '@nestjs/common';
import { GameData } from './gamedata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameDataController } from './game-data.controller';
import { GameDataService } from './game-data.service';

@Module({
    imports: [TypeOrmModule.forFeature([GameData])],
    controllers: [GameDataController],
    providers: [GameDataService],
    exports: [GameDataService],
})
export class GameDataModule {}
