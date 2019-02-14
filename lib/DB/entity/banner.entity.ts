import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany} from "typeorm";
import {Campaign} from "./campaign.entity";
import { ClientStatistic } from "./clientStats";

@Entity()
export class Banner{
    @PrimaryGeneratedColumn() id: number;
    @Column() url: string;
    @Column({type: "longtext"}) image: string;
    @Column() type: number;

    @ManyToOne(type => Campaign, campaign => campaign.banners)
    campaigns: Campaign;

    @OneToMany(clientStats => ClientStatistic, clientStats => clientStats.banner)
    clientStats: ClientStatistic[];
}