import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";
import {Campaign} from "./campaign.entity";
import { User } from "./user.entitiy";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identifier: string;

    @Column()
    type: string;

    @OneToMany(type => WebSiteUrl, url => url.profile,{onDelete:'CASCADE',cascade:true})
    urls: WebSiteUrl[];

    @ManyToOne(type => User, user => user.profile,{cascade:['insert']})
    user: User;

    @ManyToMany(campaigns => Campaign,campaign => campaign.profiles)
    campaigns: Campaign[];
}