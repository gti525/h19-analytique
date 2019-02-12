import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from "typeorm";
import { Campaign } from "./campaign.entity";
import { Income } from "./income.entitiy";

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
    campaign: Campaign[];

    @OneToOne(income => Income, income => income.user)
    income: Income;
}