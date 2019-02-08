import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identifier: string;

    @Column()
    type: string;

    @OneToMany(type => WebSiteUrl, url => url.profile, { cascade: true})
    urls: WebSiteUrl[]
}