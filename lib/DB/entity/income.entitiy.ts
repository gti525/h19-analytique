import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { User } from "./user.entitiy";

@Entity()
export class Income{
    constructor(){
        this.targetedViews = 0;
        this.targetedClicks = 0;
        this.regularViews = 0;
        this.regularClicks = 0;
        this.cashedTargetedViews = 0;
        this.cashedTargetedClicks = 0;
        this.cashedRegularViews = 0;
        this.cashedRegularClicks = 0;
    }
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    targetedViews: number;
    @Column()
    targetedClicks: number;
    @Column()
    regularViews: number;
    @Column()
    regularClicks: number;

    @Column()
    cashedTargetedViews: number;
    @Column()
    cashedTargetedClicks: number;
    @Column()
    cashedRegularViews: number;
    @Column()
    cashedRegularClicks: number;
    @OneToOne(user => User, user => user.income)
    user: User;

}