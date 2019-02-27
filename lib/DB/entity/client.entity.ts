import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ClientStatistic } from "./clientStats";

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

    // asti de hack cheap qui fonctionne
    isTargeted: boolean

    @Column()
    public graphicCard? : string;

    @Column("double")
    public latitude? : number;
    
    @Column("double")
    public longitude? : number;

    @OneToMany(clientStats => ClientStatistic, clientStats => clientStats.client,{cascade:true})
    clientStats: ClientStatistic[];
}