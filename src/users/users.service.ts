import { HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './Repository/user.repository';
import { User } from 'src/entities/User';
import { JoinRequestDto } from './dto/user.request.dto';
import { returnResponse } from 'src/common/dto/user.dto';
import { Return, eTempType } from 'src/common/Enum';
import { timestamp } from 'rxjs';
import moment from 'moment';
import { TempCodeRepository } from './Repository/tempCode.repository';
import { tempCode } from 'src/entities/tempCode';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    @InjectRepository(TempCodeRepository) private tempCodeRepository: TempCodeRepository,
    private user : User,
    private tempCode : tempCode
  ) {}

  //가입하기
  async join( req : JoinRequestDto) : Promise<any>{
    try{
      let user = await this.usersRepository.findOne({email : req.email});
      if ( user) { //if email already exists
        throw new HttpException( 'Exist_Email', Return.Exist_Email );
      }

      let uniqueNick = 0;
      let nickname = '';

      //닉네임 자동 설정 알고리즘 만들기(임시)
      while( uniqueNick == 0){
        nickname = req.first_name + moment().format('mmss') + req.last_name.slice(-1);
        let isExist = await this.usersRepository.findOne({nickname : nickname});

        if( !isExist){ //if nickname not exists
          uniqueNick = 1;
        }
      }
      
      const joinInfo = this.user.join(req.email, req.password, nickname, req.first_name, req.last_name);
      await this.usersRepository.save(joinInfo);

      return new returnResponse(Return.OK)
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }

  //계정유효성검사 이메일보내기
  async SendValidEmail( currentUser : User) : Promise<any>{
    try{
      const max_trycnt = 4;
      
      let tempInfo = await this.tempCodeRepository.findOne({ uid : currentUser.uid, type : eTempType.Valid_Email});

      let code;

      if( tempInfo){
        //하루에 4회를 초과하였다면
        if( tempInfo.trycnt > max_trycnt && moment().diff( moment(tempInfo.send_date), 'd') > 1)
          throw new HttpException('Over_Max_Count', Return.Over_Max_Count);
        
        else {
          // 코드 생성하고, 이메일 보내기
          tempInfo.update();
          await this.tempCodeRepository.update({id : tempInfo.id},tempInfo);
        }
      }

      //if there is no list
      else if( !tempInfo){
        //코드 생성하고, 이메일 보내기
        let temp = this.tempCode.create( eTempType.Valid_Email, code, currentUser.uid);
        await this.tempCodeRepository.save(temp, {reload : false});
      }

      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //계정 임시번호 맞는지 확인하기

  
  

}
