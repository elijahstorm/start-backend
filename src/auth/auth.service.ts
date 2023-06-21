import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Return } from 'src/common/Enum';
import { UserRepository } from 'src/users/Repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['uid', 'email', 'password','email_varification_time','nickname','trycnt'],
    });

    if (!user) {
      return null;
    }

    //check password
    const result = user.password == password ? true : false;

    if( result == false){
      throw new HttpException( 'WRONG_PASSWORD', Return.NOT_EMAIL_VARIFI_USER );
    }

    else if (result == true) {
      //password를 제외한 나머지값을 넘겨주기
      const { password, ...userWithoutPassword } = user; 

      //아직 이메일 검증을 하지 않았다면 에러 던지기
      if( user.email_varification_time == null){
        throw new HttpException( 'NOT_EMAIL_VARIFI_USER', Return.NOT_EMAIL_VARIFI_USER );
      }

      return userWithoutPassword;
    }
    return null;
  }
}
