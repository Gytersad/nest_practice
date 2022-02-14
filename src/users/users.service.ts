import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) 
        private userRepository: Repository<User>,
        private roleService: RolesService
    ) {}


    async createUser (dto: CreateUserDto) : Promise<User> {
        const newUser = await this.userRepository.save(dto);
        const role = await this.roleService.getRoleByValue('USER')
        const newUserWithRole = await this.userRepository.findOne(newUser.id, { relations: ["roles"] });
        newUserWithRole.roles.push(role)
        await this.userRepository.save(newUserWithRole);
        return newUserWithRole;
    }

   async getAllUsers() : Promise<User[]> {
       const users = await this.userRepository.find({
           relations: ["roles"],
       })
       return users;
   }

}
