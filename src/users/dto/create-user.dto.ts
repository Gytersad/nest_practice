import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";


export class CreateUserDto {
    @ApiProperty({example: 'user@mail.com', description: 'Почтовый адрес пользователя'})
    @IsString({message:'Должно быть строкой'})
    @IsEmail({},{message: 'Некорректый email'})
    readonly email: string;
    @ApiProperty({example: '123', description: 'Пароль пользователя'})
    @IsString({message:'Должно быть строкой'})
    @Length(4,16,{message:'Не меньше 4 и не больше 16 символов'})
    readonly password: string;
}