import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {Banner} from "./banner.entity";
import {Profile} from "./profile.entitiy";

@Entity()
export class Campaign{
    @PrimaryGeneratedColumn() id: number;
    @Column() startDate: Date;
    @Column() endDate: Date;

    @OneToMany(type => Banner, banner => banner.campaign, { cascade: true})
    banners: Banner[]

    @OneToMany(type => Profile, profile => profile.campaign)
    profiles: Profile[]
}

export enum CampaignTypes {
    Horizontal = 0,
    Vertical = 1,
    Mobile = 2
}
