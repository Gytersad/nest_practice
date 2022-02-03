import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    
    @ApiProperty({example: '1', description: 'Уникальный идентифиактор'})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({example: 'user@mail.com', description: 'Почтовый адрес пользователя'})
    @Column('text', {unique: true, nullable: false})
    email: string;
    
    @ApiProperty({example: '123', description: 'Пароль пользователя'})
    @Column('text', {nullable: false})
    password: string;
    
    @ApiProperty({example: 'false', description: 'Забанен или нет'})
    @Column({default: false})
    banned:boolean;
    
    @ApiProperty({example: 'Спам', description: 'Причина бана'})
    @Column({nullable: true})
    banReason: string;
}