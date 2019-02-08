import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";

@Entity()
export class Statistique{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    os: string;

    @Column()
    resolution: string;

    @Column()
    pays: string;

    @Column()
    userId: number;


/*    @ManyToMany(type => WebSiteUrl, websiteurl => websiteurl.profiles,{cascade: true})
    @JoinTable()
    websiteurls?: WebSiteUrl[];*/
}