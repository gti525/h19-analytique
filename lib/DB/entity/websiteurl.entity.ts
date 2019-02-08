import {Entity, PrimaryColumn, ManyToOne} from "typeorm";
import { Profile } from "./profile.entitiy";

@Entity()
export class WebSiteUrl{
    @PrimaryColumn()
    url: string;

    @ManyToOne(type => Profile, profile => profile.urls)
    profile: Profile;
}