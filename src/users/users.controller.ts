import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Response
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { currentUser } from '../common/decorators/CurrentUser.decorator';

import { ConformAuthEmailRequestDto, JoinRequestDto, SendAuthEmailRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { User } from 'src/entities/User';
import { returnErrorResponse, returnResponse } from 'src/common/dto/common.dto';
import { Return } from 'src/common/Enum';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: 'currentUser' })
  @Get()
  async getProfile(@currentUser() user: User) {
    return user || false;
  }

  @ApiOperation({ summary: 'join' })
  @UseGuards(NotLoggedInGuard)
  @Post('join')
  @ApiCreatedResponse({type : returnResponse, description : ' result is undefined'})
  @ApiBadRequestResponse({
    description : `
    10000 : already exist email error`, type : returnErrorResponse })
  async join(@Body() req: JoinRequestDto) {
    return await this.usersService.join(req);
  }

  @ApiOperation({ summary: 'login' })
  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse({
    description : `
    2 : NOT_EMAIL_VARIFI_USER,
    11000 : fail login`, type : returnErrorResponse })
  @Post('login')
  async login(@currentUser() user: User) {
    return new returnResponse(Return.OK, user);
  }

  @ApiOperation({ summary: 'sendAuthEmail' })
  @ApiBadRequestResponse({
    description : `
    1 : Not_Exist_Email,
    12000 : Over_Max_Count`, type : returnErrorResponse })
  @Post('/sendEmail')
  async sendAuthEmail(
    @Body() req: SendAuthEmailRequestDto) {
    return await this.usersService.SendAuthEmail(req);
  }


  @ApiOperation({ summary: 'conformAuthEmail' })
  @ApiBadRequestResponse({
    description : `
    1 : Not_Exist_Email,
    13000 : Over_Time,
    13001 : Wrong_Code,
    `, type : returnErrorResponse })
  @Post('/conform')
  async conformAuthEmail(
    @Body() req : ConformAuthEmailRequestDto ) {
    return await this.usersService.conformValidEmail(req);
  }



  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: 'logout' })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }
}
