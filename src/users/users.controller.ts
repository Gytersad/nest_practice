import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: 'Создаине пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    async create (@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }
    
    @ApiOperation({summary: 'Получене пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    async getall () {
        return this.usersService.getAllUsers();
    }
}
