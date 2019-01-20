import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";

@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    profile: string;

    @ManyToMany(type => WebSiteUrl, websiteurl => websiteurl.profiles,{cascade: true})
    @JoinTable()
    websiteurls?: WebSiteUrl[];
};