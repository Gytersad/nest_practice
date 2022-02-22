import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { PostsController } from './posts.controller';
import { Post } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    FilesModule
  ],
})
export class PostsModule {}
