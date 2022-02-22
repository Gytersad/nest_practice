import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) 
        private userRepository: Repository<User>,
        private roleService: RolesService
    ) {}


    async createUser(userDto: CreateUserDto) : Promise<User> {

        const newUser = await this.userRepository.save(userDto);

        const role = await this.roleService.getRoleByValue('USER')

        const newUserWithRole = await this.userRepository.findOne(newUser.id, { relations: ["roles"] });
        newUserWithRole.roles.push(role)
        await this.userRepository.save(newUserWithRole);

        return newUserWithRole;
    }

    async getAllUsers() : Promise<User[]> {
        const users = await this.userRepository.find({relations: ["roles"]})
        return users;
    }

    async getUserByEmail(email:string){
        const user = await this.userRepository.findOne({where: {email}, relations: ["roles"]})
        return user
    }

    async addRole (addRoleDto: AddRoleDto): Promise<AddRoleDto> {
        const user = await this.userRepository.findOne(addRoleDto.userId, { relations: ["roles"] })
        const role = await this.roleService.getRoleByValue(addRoleDto.value)
        if ( role && user) {
            user.roles.push(role)
            await this.userRepository.save(user);
            return addRoleDto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban (banUserDto: BanUserDto): Promise<BanUserDto> {
        const user = await this.userRepository.findOne(banUserDto.userId, { relations: ["roles"] })
        if (user) {
            user.roles = []
            user.banned = true
            user.banReason = banUserDto.banReason
            await this.userRepository.save(user);
            return banUserDto
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)

    }

}
