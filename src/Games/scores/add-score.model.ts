import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class AddScoreModel {
    @IsNumber()
    winner: number;

    @IsNumber()
    breaker: number;

    @IsNumber()
    stripes: number;

    @IsNumber()
    solids: number;

    @IsBoolean()
    beatSelf: boolean;

    @IsBoolean()
    easyPocket: boolean;

    @IsNumber()
    ballsLeft: number;

    id?: number;
}
