import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { UserRepository } from 'src/users/Repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['uid', 'email', 'password'],
    });
    console.log(email, password, user);
    if (!user) {
      return null;
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
