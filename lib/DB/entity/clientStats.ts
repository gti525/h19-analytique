import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Client } from "./client.entity";
import { Banner } from "./banner.entity";

@Entity()
export class ClientStatistic{
    constructor(){
        this.date = new Date();
    }
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(client => Client, client => client.clientStats)
    client: Client;

    @Column()
    date: Date;

    @ManyToOne(banner => Banner, banner => banner.clientStats)
    banner: Banner;

    @Column()
    isView: boolean;

    @Column()
    isClick: boolean;
    
    @Column()
    url: string;

    @Column()
    isTargeted: boolean;
    
}