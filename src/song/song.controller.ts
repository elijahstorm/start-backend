import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Response,
  Param,
  Query,
  Put,
  Delete
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCookieAuth, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { currentUser } from '../common/decorators/CurrentUser.decorator';
import { User } from 'src/entities/User';
import { returnIdResponse, returnResponse } from 'src/common/dto/common.dto';
import { SongService } from './song.service';
import { PageRequestDto } from 'src/common/page/PageRequest';
import { UpsertPlayListRequestDto, UpsertSingerRequestDto, UpsertSongRequestDto, UpsertVideoRequestDto, addLikeRequestDto, getPlayListRequestDto, upsertCommentRequestDto } from './dto/songRequest';
import { getPlaylistDto } from './dto/songResponse';

@ApiTags('Song')
@Controller('api/song')
export class SongController {
  constructor(private songService: SongService) {}

  @ApiOperation({ summary: 'get playlist' })
  @Get()
  @ApiExtraModels(PageRequestDto, getPlaylistDto)
  @ApiResponse({schema:{
      allOf:[
          { $ref : getSchemaPath(PageRequestDto)}, 
          { properties : { items : { type : "array" , items : {$ref : getSchemaPath(getPlaylistDto)}}}} 
      ]
  }})
  async getPlayList(
    @Query() req : getPlayListRequestDto,
    @Query() page : PageRequestDto,
    @currentUser() user : User
    ) {
    return await this.songService.getAllPlaylist(req, page, user?.uid);
  }

  
  @ApiOperation({ summary: 'get playlist one' })
  @Get('/:playlist_id')
  @ApiExtraModels(returnResponse, getPlaylistDto)
  @ApiResponse({schema:{
      allOf:[
          { $ref : getSchemaPath(returnResponse)}, 
          { properties : { items : { type : "array" , items : {$ref : getSchemaPath(getPlaylistDto)}}}} 
      ]
  }})
  async getOnePlaylist(
    @Param('playlist_id') id : number,
    @currentUser() user : User
    ) {
    return await this.songService.getAllPlaylistOne(id, user?.uid);
  }



  //노래 정보 가져오기
  @ApiOperation({ summary: 'get song detail info' })
  @ApiExtraModels(returnResponse, getPlaylistDto)
  @ApiResponse({schema:{
      allOf:[
          { $ref : getSchemaPath(returnResponse)}, 
          { properties : { items : { type : "array" , items : {$ref : getSchemaPath(getPlaylistDto)}}}} 
      ]
  }})
  @Get('/song/:song_id')
  async getSongDetail(
    @Param('song_id') id : number,
    @currentUser() user : User) {
    return await this.songService.getSongDetail(id, user?.uid);
  }


  //노래 등록하기
  @ApiOperation({ summary: 'save song' })
  @ApiResponse({type : returnResponse})
  @Post('/song')
  async saveSong(
    @Body() req : UpsertSongRequestDto) {
    return await this.songService.SaveSong(req);
  }


  //노래 수정하기
  @ApiOperation({ summary: 'save song' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Put('/song/:song_id')
  async updateSong(
    @Param('song_id') song_id : number,
    @Body() req : UpsertSongRequestDto) {
    return await this.songService.updateSong(song_id, req);
  }

  //비디오 등록하기
  @ApiOperation({ summary: 'save video' })
  @ApiResponse({type : returnResponse})
  @Post('/video')
  async saveVideo(
    @Body() req : UpsertVideoRequestDto) {
    return await this.songService.SaveVideo(req);
  }


  //비디오 수정하기
  @ApiOperation({ summary: 'save video' })
  @ApiResponse({type : returnIdResponse})
  @UseGuards(LoggedInGuard)
  @Put('/video/:video_id')
  async updateVideo(
    @Param('video_id') video_id : number,
    @Body() req : UpsertVideoRequestDto) {
    return await this.songService.updateVideo(video_id, req);
  }

  
  //가수 등록하기
  @ApiOperation({ summary: 'save singer' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Post('/singer')
  async saveSinger(
    @Body() req : UpsertSingerRequestDto) {
    return await this.songService.createSinger(req);
  }


  //가수 수정하기
  @ApiOperation({ summary: 'save signer' })
  @ApiResponse({type : returnIdResponse})
  @UseGuards(LoggedInGuard)
  @Put('/singer/:singer_id')
  async createSinger(
    @Param('singer_id') singer_id : number,
    @Body() req : UpsertSingerRequestDto) {
    return await this.songService.updateSinger(singer_id, req);
  }


  //플레이 리스트 등록하기
  @ApiOperation({ summary: 'make playlist' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Post('/playlist')
  async makePlaylist(
    @Body() req : UpsertPlayListRequestDto,
    @currentUser() user : User) {
    return await this.songService.createPlayList(req, user.uid);
  }
  

  //플레이 리스트 수정하기
  @ApiOperation({ summary: 'update playlist' })
  @ApiResponse({type : returnIdResponse})
  @UseGuards(LoggedInGuard)
  @Put('/playlist/:playlist_id')
  async createPlayList(
    @Param('playlist_id') playlist_id : number,
    @Body() req : UpsertPlayListRequestDto,
    @currentUser() user : User) {
    return await this.songService.updatePlayList(playlist_id, req, user.uid);
  }


  //플레이 리스트 삭제하기
  @ApiOperation({ summary: 'delete soft delete playlist' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Put('/playlist/:playlist_id')
  async deletePlayList(
    @Param('playlist_id') playlist_id : number,
    @currentUser() user : User) {
    return await this.songService.deletePlayList(playlist_id, user.uid);
  }

  
  //플레이 리스트에 노래 추가하기
  @ApiOperation({ summary: 'add playlist song' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Post('/playlistsong')
  async addPlaylistSong(
    @Body() req : UpsertPlayListRequestDto,
    @currentUser() user : User) {
    return await this.songService.addPlayListSong(req, user.uid);
  }
  

  //플레이 리스트 삭제하기
  @ApiOperation({ summary: 'delete soft delete playlist' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Delete('/playlistsong/:playlistsong_id')
  async deletePlayListSong(
    @Param('playlistsong_id') playslit_id : number,
    @currentUser() user : User) {
    return await this.songService.deletePlayList(playslit_id, user.uid);
  }


  //좋아요 누르기
  @ApiOperation({ summary: 'add like' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Post('/like')
  async addLike(
    @Body() req : addLikeRequestDto,
    @currentUser() user : User) {
    return await this.songService.addLike(req, user.uid);
  }


  //좋아요 취소하기
  @ApiOperation({ summary: 'cancel like' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Delete('/like/:like_id')
  async deleteLike(
    @Param('like_id') like_id : number,
    @currentUser() user : User) {
    return await this.songService.deleteLike(like_id, user.uid);
  }


  //코멘트 남기기
  @ApiOperation({ summary: 'add comment' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Post('/comment')
  async addComment(
    @Body() req : upsertCommentRequestDto,
    @currentUser() user : User) {
    return await this.songService.addComment(req, user.uid);
  }

  
  //코멘트 수정하기
  @ApiOperation({ summary: 'update comment' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Put('/comment/:comment_id')
  async updateComment(
    @Param('comment_id') comment_id : number,
    @Body() req : upsertCommentRequestDto,
    @currentUser() user : User) {
    return await this.songService.updateComment(comment_id, req, user.uid);
  }


  //코멘트 삭제하기
  @ApiOperation({ summary: 'delete comment' })
  @ApiResponse({type : returnResponse})
  @UseGuards(LoggedInGuard)
  @Delete('/comment/:comment_id')
  async deleteComment(
    @Param('comment_id') comment_id : number,
    @currentUser() user : User) {
    return await this.songService.deleteComment(comment_id, user.uid);
  }

}
