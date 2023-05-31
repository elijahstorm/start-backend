import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';
import { User } from 'src/entities/User';
import { UserRepository } from 'src/users/Repository/user.repository';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
