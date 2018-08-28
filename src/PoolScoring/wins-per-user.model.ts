import { IsNumber } from 'class-validator';

export class WinsPerUserModel {
    @IsNumber()
    chrisWins: number;
    @IsNumber()
    keatonWins: number;
}
