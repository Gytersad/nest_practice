import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface UserCreationAttrs {
    email: string;
    password: string;
}


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: false})
    banned:boolean;

    @Column({nullable: true})
    banReason: string;
}