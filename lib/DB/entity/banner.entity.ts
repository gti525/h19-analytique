import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Campaign} from "./campaign.entity";

@Entity()
export class Banner{
    @PrimaryGeneratedColumn() id: number;
    @Column() url: string;
    @Column({type: "longblob"}) image: Buffer;
    @Column() type: number;

    @ManyToOne(type => Campaign, campaign => campaign.banners)
    campaign: Campaign;
}