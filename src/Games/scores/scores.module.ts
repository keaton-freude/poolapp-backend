import { Module } from '@nestjs/common';
import { Score } from './score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresController } from './scores-controller';
import { ScoresService } from './scores-service';
import { GameDataModule } from '../game-data/game-data.module';
import { UserModule } from 'UsersModule/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Score]), GameDataModule, UserModule],
    controllers: [ScoresController],
    providers: [ScoresService],
    exports: [ScoresService],
})
export class ScoresModule {}
