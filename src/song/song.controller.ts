import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Response,
  Param
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { currentUser } from '../common/decorators/CurrentUser.decorator';
import { User } from 'src/entities/User';
import { returnErrorResponse, returnResponse } from 'src/common/dto/user.dto';
import { SongService } from './song.service';

@ApiTags('Song')
@Controller('api/song')
@UseGuards(LoggedInGuard)
export class SongController {
  constructor(private songService: SongService) {}


  // @ApiOperation({ summary: 'get song List' })
  // @Get('')
  // @ApiCreatedResponse({type : returnResponse, description : ' result is undefined'})
  // @ApiBadRequestResponse({
  //   description : `
  //   10000 : already exist email error`, type : returnErrorResponse })
  // async getSongList(
  //   @Param('id') id : number) {
  //   return await this.songService.getSongList(id);
  // }


  //노래 정보 가져오기
  @ApiOperation({ summary: 'get song detail info' })
  @Get('/:id')
  @ApiCreatedResponse({type : returnResponse, description : ' result is undefined'})
  @ApiBadRequestResponse({
    description : `
    10000 : already exist email error`, type : returnErrorResponse })
  async join(
    @Param('id') id : number) {
    return await this.songService.getSongDetail(id);
  }

  //노래 등록하기


  //노래 playlist가져오기

}
