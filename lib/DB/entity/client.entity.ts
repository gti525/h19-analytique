import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, OneToMany } from "typeorm";
import { Campaign } from "./campaign.entity";
import { Banner } from "./banner.entity";
import { ClientStats } from "./clientStats";

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
    isTargettable: boolean

    @Column()
    public graphicCard? : string;

    @Column("double")
    public latitude? : number;
    
    @Column("double")
    public longitude? : number;

    @OneToMany(clientStats => ClientStats, clientStats => clientStats.client)
    clientStats: ClientStats[];
}