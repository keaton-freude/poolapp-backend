import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';

import { AuthModule } from 'AuthenticationModule/auth.module';
import { UserModule } from 'UsersModule/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesModule } from 'Games/games.module';

@Module({
    imports: [
        AuthModule,
        GamesModule,
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['src/**/**.entity{.ts,.js}'],
            synchronize: true,
            logging: true,
        }),
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
