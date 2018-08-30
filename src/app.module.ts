import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolScoringModule } from './PoolScoring/pool-scoring.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'Users/users.module';

@Module({
    imports: [
        PoolScoringModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['src/**/**.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
