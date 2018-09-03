import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ValidationPipe } from '@nestjs/common';

import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.use(cors());
    const NEST_PORT = process.env.PORT || 3000;
    // tslint:disable-next-line:no-console
    console.log(`Listening on ${NEST_PORT}`);
    await app.listen(NEST_PORT);
}
bootstrap();
