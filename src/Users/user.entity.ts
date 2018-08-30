import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Score } from "../PoolScoring/scores.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}