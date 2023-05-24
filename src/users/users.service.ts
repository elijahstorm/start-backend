import { HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './Repository/user.repository';
import { User } from 'src/entities/User';
import { JoinRequestDto } from './dto/user.request.dto';
import { returnResponse } from 'src/common/dto/user.dto';
import { Return } from 'src/common/Enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    private user : User
  ) {}

  async join( req : JoinRequestDto) : Promise<any>{
    try{
      let user = await this.usersRepository.findOne({email : req.email});
      if ( user) { //if email already exists
        throw new HttpException( 'Exist_Email', Return.Exist_Email );
      }

      let nickname = await this.usersRepository.findOne({nickname : req.email});
      if( nickname){ //if nickname already exists
        throw new HttpException( 'Exist_Nickname', Return.Exist_Nickname);
      }
      
      const joinInfo = this.user.join(req.email, req.password, req.nickname, req.first_name, req.last_name);
      await this.usersRepository.save(joinInfo);

      return new returnResponse(Return.OK)

    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }
  

}
