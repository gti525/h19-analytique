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

    @OneToMany(type => WebSiteUrl, url => url.profile, { cascade: true})
    urls: WebSiteUrl[];

    @ManyToOne(type => User, user => user.profile, { cascade: true})
    user: User;

    @ManyToMany(type => Campaign)
    campaign: Campaign;
}