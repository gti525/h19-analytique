import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Campaign } from "./campaign.entity";
import { Income } from "./income.entitiy";
import { Profile } from "./profile.entitiy";
import { ClientStatistic } from "./clientStats";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique:true})
    username: string;
    @Column()
    password?: string;
    @Column()
    role: string;
    @Column({nullable:true})
    analyticToken: string;

    @OneToMany(type => Campaign, campaign => campaign.user)
    campaigns: Campaign[];

    @OneToMany(type => ClientStatistic, clientStatistics => clientStatistics.user)
    clientStatistics: ClientStatistic[];

    @OneToMany(type => Profile, profile => profile.user)
    profile: Profile[];

    @OneToOne(type => Income,{cascade:true})
    @JoinColumn()
    income: Income;
}