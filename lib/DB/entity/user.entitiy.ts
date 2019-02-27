import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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
    @Column({nullable:true, unique:true })
    accountNumber: string;
}
