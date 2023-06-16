import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './Repository/user.repository';
import { TempCodeRepository } from './Repository/tempCode.repository';
import { tempCode } from 'src/entities/tempCode';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from 'src/common/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, TempCodeRepository]),
  ],
  providers: [UsersService, User, tempCode, EmailService],
  controllers: [UsersController],
})
export class UsersModule {}