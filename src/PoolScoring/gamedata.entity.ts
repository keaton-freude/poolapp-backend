import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GameData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startId: number;

    @Column()
    winner: string;
}