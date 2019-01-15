import {Entity, PrimaryColumn, ManyToMany} from "typeorm";
import { Profile } from "./profile.entitiy";

@Entity()
export class WebSiteUrl{
    @PrimaryColumn()
    url: string;

    @ManyToMany(type => Profile, profile => profile.websiteurls)
    profiles?: Profile[];
};