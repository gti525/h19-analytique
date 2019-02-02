import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";

@Entity()
export class Statistique{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @Column({unique:true})
    url: string;

/*    @ManyToMany(type => WebSiteUrl, websiteurl => websiteurl.profiles,{cascade: true})
    @JoinTable()
    websiteurls?: WebSiteUrl[];*/
}