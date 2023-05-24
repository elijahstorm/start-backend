import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './Repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UsersService, User],
  controllers: [UsersController],
})
export class UsersModule {}