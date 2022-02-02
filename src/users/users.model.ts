import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', {unique: true, nullable: false})
    email: string;

    @Column('text', {nullable: false})
    password: string;

    @Column({default: false})
    banned:boolean;

    @Column({nullable: true})
    banReason: string;
}