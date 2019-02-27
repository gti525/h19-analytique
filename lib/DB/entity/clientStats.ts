import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Client } from "./client.entity";
import { Banner } from "./banner.entity";
import { User } from "./user.entitiy";

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

    @ManyToOne(user => User, user => user.clientStatistics)
    user: User;

    @Column()
    isView: boolean;

    @Column()
    isClick: boolean;
    
    @Column()
    url: string;

    @Column()
    isTargeted: boolean;
    
}