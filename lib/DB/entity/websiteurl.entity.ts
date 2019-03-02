import {Entity, ManyToOne, Column, PrimaryGeneratedColumn} from "typeorm";
import { Profile } from "./profile.entitiy";

@Entity()
export class WebSiteUrl{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type => Profile, profile => profile.urls)
    profile: Profile;
}