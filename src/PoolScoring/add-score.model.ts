import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class AddScoreModel {
    @IsString()
    winner: string;
    @IsString()
    breaker: string;
    @IsString()
    stripes: string;
    @IsString()
    solids: string;
    @IsBoolean()
    beatSelf: boolean;
    @IsBoolean()
    easyPocket: boolean;
    @IsNumber()
    ballsLeft: number;
}
