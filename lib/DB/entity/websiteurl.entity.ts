import {Entity, PrimaryColumn, ManyToMany} from "typeorm";

@Entity()
export class WebSiteUrl{
    @PrimaryColumn()
    url: string;

}