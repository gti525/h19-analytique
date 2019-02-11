import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Campaign} from "./campaign.entity";

@Entity()
export class Banner{
    @PrimaryGeneratedColumn() id: number;
    @Column() url: string;
    @Column({type: "longtext"}) image: string;
    @Column() type: number;

    @ManyToOne(type => Campaign, campaign => campaign.banners)
    campaign: Campaign;
}