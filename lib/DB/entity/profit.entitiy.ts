import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Profit{
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
}