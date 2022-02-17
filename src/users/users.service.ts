import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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


    async createUser(userDto: CreateUserDto) : Promise<User> {

        const newUser = await this.userRepository.save(userDto);

        const role = await this.roleService.getRoleByValue('ADMIN')

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

}
