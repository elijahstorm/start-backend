import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './Repository/user.repository';
import { TempCodeRepository } from './Repository/tempCode.repository';
import { EmailService } from 'src/common/email/email.service';
import { TempCode } from 'src/entities/TempCode';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TempCodeRepository]),
  ],
  providers: [UsersService, User, TempCode, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}