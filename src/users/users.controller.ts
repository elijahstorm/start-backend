import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Get,
  Response
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { currentUser } from '../common/decorators/CurrentUser.decorator';

import { JoinRequestDto } from './dto/user.request.dto';
import { UsersService } from './users.service';
import { User } from 'src/entities/User';
import { returnErrorResponse, returnResponse } from 'src/common/dto/user.dto';

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
    10000 : already exist email error,
    10001 : already exist nickname error`, type : returnErrorResponse })
  async join(@Body() req: JoinRequestDto) {
    return await this.usersService.join(req);
  }

  @ApiOperation({ summary: 'login' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@currentUser() user: User) {
    return user;
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
