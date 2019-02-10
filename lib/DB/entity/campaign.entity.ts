import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {Banner} from "./banner.entity";
import {Profile} from "./profile.entitiy";

@Entity()
export class Campaign{
    @PrimaryGeneratedColumn() id: number;
    @Column() startDate: Date;
    @Column() endDate: Date;

    @OneToMany(type => Banner, banner => banner.campaign, { cascade: true})
    banners: Banner[];

    @ManyToMany(type => Profile)
    @JoinTable()
    profiles: Profile[];
}

export enum CampaignTypes {
    Horizontale = 0,
    Verticale = 1,
    Mobile = 2
}
