import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Banner} from "./banner.entity";
import {Profile} from "./profile.entitiy";
import { User } from "./user.entitiy";

@Entity()
export class Campaign{
    @PrimaryGeneratedColumn() id: number;
    @Column() startDate: Date;
    @Column() endDate: Date;

    @OneToMany(banner => Banner, banner => banner.campaigns, { cascade: true,onDelete:"CASCADE" })
    banners: Banner[];
    
    @ManyToOne(type => User, user => user.campaigns)
    user: User;
    
    @ManyToMany(profiles => Profile, profiles => profiles.campaigns )
    @JoinTable()
    profiles: Profile[];
}

export enum BannerType {
    Horizontale = 0,
    Verticale = 1,
    Mobile = 2
}
