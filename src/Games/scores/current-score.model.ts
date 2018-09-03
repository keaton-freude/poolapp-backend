import { IsNumber } from 'class-validator';

export class CurrentScoreModel {
    @IsNumber()
    chrisWins: number;
    @IsNumber()
    keatonWins: number;
}
