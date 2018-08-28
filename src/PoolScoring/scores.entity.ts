import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    winner: string;

    @Column()
    breaker: string;

    @Column()
    stripes: string;

    @Column()
    solids: string;

    @Column()
    beatSelf: boolean;

    @Column()
    easyPocket: boolean;

    @Column()
    ballsLeft: number;
}
