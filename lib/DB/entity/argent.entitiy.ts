import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class argent{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    visiteurregulier: string;
    @Column()
    visiteurcible: string;
    @Column()
    publicitevue: number;
    @Column()
    publicitecliquer: number;
}