import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Campaign{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    profile: string;

}
