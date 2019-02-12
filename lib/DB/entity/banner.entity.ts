import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToOne} from "typeorm";
import {Campaign} from "./campaign.entity";
import { Client } from "./client.entity";
import { ClientStats } from "./clientStats";

@Entity()
export class Banner{
    @PrimaryGeneratedColumn() id: number;
    @Column() url: string;
    @Column({type: "longtext"}) image: string;
    @Column() type: number;

    @ManyToOne(type => Campaign, campaign => campaign.banners)
    campaign: Campaign;

    @OneToOne(clientStats => ClientStats, clientStats => clientStats.banner)
    clientStats: ClientStats;
}