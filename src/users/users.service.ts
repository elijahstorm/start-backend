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
import { EmailService } from 'src/common/email/email.service';
const crypto = require('crypto');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private usersRepository: UserRepository,
    @InjectRepository(TempCodeRepository) private tempCodeRepository: TempCodeRepository,
    private emailSerivce : EmailService,
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
  async SendAuthEmail( currentUser : User) : Promise<any>{
    try{
      const max_trycnt = 4;
      //임시코드 생성
      const tempCode = crypto.randomBytes(6).toString('hex');
      let tempInfo = await this.tempCodeRepository.findOne({ uid : currentUser.uid, type : eTempType.Valid_Email});


      //이전 발급내역이 있다면-------------------------------------------------------------------------
      if( tempInfo){
        //하루에 4회를 초과하였다면
        if( tempInfo.trycnt > max_trycnt && moment().diff( moment(tempInfo.send_date), 'd') > 1)
          throw new HttpException('Over_Max_Count', Return.Over_Max_Count);

        
        else {
          if( tempInfo.trycnt > max_trycnt){
            tempInfo.resetupdate();
          }

          tempInfo.update(tempCode);
          await this.emailSerivce.sendTempPW( currentUser.email, tempCode);
          await this.tempCodeRepository.update({id : tempInfo.id} ,tempInfo);
          
        }
      }

      //if there is no list -------------------------------------------------------------------------------
      else if( !tempInfo){
        //코드 생성하고, 이메일 보내기
        let temp = this.tempCode.create( eTempType.Valid_Email, tempCode, currentUser.uid);
        await this.emailSerivce.sendTempPW( currentUser.email, tempCode);
        await this.tempCodeRepository.save(temp, {reload : false});
      }

      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //계정 임시번호 맞는지 확인하기
 async conformValidEmail( req ,currentUser : User) : Promise<any>{
  try{
    const tempInfo = await this.tempCodeRepository.findOneOrFail({ uid : currentUser.uid, type : eTempType.Valid_Email});
    
    if( moment().diff( moment(tempInfo.send_date), 'd') > 1){
      throw new HttpException( 'Over_Time', Return.Over_Time );
    }

    if( tempInfo.code != req.tempCode){
      throw new HttpException( 'Wrong_Code', Return.Wrong_Code );
    }

    
    return new returnResponse(Return.OK);
  }
  catch(err){
    throw new HttpException(err, err.status);
  }
}


  
  

}
