import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn, OneToOne } from "typeorm";
import { Profile } from "./profile.entitiy";

@Entity()
export class Campaign{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

}
