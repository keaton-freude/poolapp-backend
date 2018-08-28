import { Module } from '@nestjs/common';
import { ScoresController } from './scores-controller';
import { ScoresService } from './scores-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './scores.entity';
import { WinsController } from './wins-controller';

@Module({
    imports: [TypeOrmModule.forFeature([Score])],
    controllers: [ScoresController, WinsController],
    providers: [ScoresService],
})
export class PoolScoringModule {}
