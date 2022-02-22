import { User } from "src/users/users.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('text')
    title: string;
    
    @Column('text')
    content: string;
    
    @Column('text')
    image: string;
    
    @ManyToOne(() => User, user => user.posts)
    author: User
}