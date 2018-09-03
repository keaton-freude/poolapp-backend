import { Module } from '@nestjs/common';
import { WinsController } from './wins-controller';
import { WinsService } from './wins.service';
import { ScoresModule } from '../scores/scores.module';

@Module({
    imports: [ScoresModule],
    controllers: [WinsController],
    providers: [WinsService],
})
export class WinsModule {}
