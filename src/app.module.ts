import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolScoringModule } from 'PoolScoring/pool-scoring.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        PoolScoringModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['src/**/**.entity{.ts,.js}'],
            synchronize: true,
            // tslint:disable-next-line:quotemark
            ssl: 'enable',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
