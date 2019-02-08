import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Client{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    os?: string;

    @Column()
    resolution?: string
    
    @Column()
    public browser? : string;

    @Column()
    date: Date;
    @Column()
    identifier: string

    @Column()
    public graphicCard? : string;

    @Column("double")
    public latitude? : number;
    
    @Column("double")
    public longitude? : number;
}