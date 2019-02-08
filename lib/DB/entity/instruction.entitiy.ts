import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Instruction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({unique: true})
    url: string;


}