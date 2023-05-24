import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './Repository/user.repository';
import { User } from 'src/entities/User';
import { JoinRequestDto } from './dto/join.request.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    private user : User
  ) {}

  async join( req : JoinRequestDto) : Promise<User>{
    try{
      let user = await this.usersRepository.findOne({email : req.email});
      if ( user) { //if email already exists
        throw new HttpException('already-exists', 400);
      }
      
      const joinInfo = this.user.join(email, password, nickname);
      await this.usersRepository.save(joinInfo);
    
      return joinInfo;
    }
    catch(err){
      throw new HttpException(err, 400);
    }
  }

}
