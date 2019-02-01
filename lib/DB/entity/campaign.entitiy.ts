import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { WebSiteUrl } from "./websiteurl.entity";

@Entity()
export class Campaign{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @Column({unique:true})
    url: string;

}