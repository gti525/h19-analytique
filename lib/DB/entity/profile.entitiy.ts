import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";
import {Campaign} from "./campaign.entity";

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

    @ManyToMany(type => Campaign)
    campaign: Campaign;
}