import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(@InjectRepository(Post) 
        private postRepository: Repository<Post>,
        private filesService: FilesService
    ){}

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.filesService.createFile(image)
        const post = await this.postRepository.save({...dto, image: fileName})
        return post
    }
}
