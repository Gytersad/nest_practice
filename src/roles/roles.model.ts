import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Role {
    
    @ApiProperty({example: '1', description: 'Уникальный идентифиактор'})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({example: 'ADMIN', description: 'Значение роли пользователя'})
    @Column('text', {unique: true, nullable: false})
    value: string;
    
    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column('text', {nullable: false})
    description: string;

    @ManyToMany(() => User)
    users: User[];
}