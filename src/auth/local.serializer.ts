import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/users/Repository/user.repository';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
  ) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log(user);
    done(null, user.uid);
  }

  async deserializeUser(uid: number, done: CallableFunction) {
    return await this.usersRepository
      .findOneOrFail({uid : uid},
        {
          select: ['uid', 'email'],

        },
      )
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
