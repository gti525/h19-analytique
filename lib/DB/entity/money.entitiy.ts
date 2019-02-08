import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Money{
    @PrimaryGeneratedColumn()
    user: string;
    @Column()
    regulier: string;
    @Column()
    cible: string;
    @Column()
    vue: number;
    @Column()
    cliquer: number;


}