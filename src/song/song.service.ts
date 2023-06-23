import { HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnIdResponse, returnResponse } from 'src/common/dto/common.dto';
import { Return} from 'src/common/Enum';
import { SongRepository } from './repository/song.repository';
import { PlayListRepository } from './repository/playlist.repository';
import { PageRequestDto } from 'src/common/page/PageRequest';
import { PlayListSongRepository } from './repository/playlistSong.repository';
import { Page } from 'src/common/page/Page';
import { getPlaylistDto, getSongDetailInfoDto } from './dto/songResponse';
import { UpsertPlayListRequestDto, UpsertSingerRequestDto, UpsertSongRequestDto, UpsertVideoRequestDto, addLikeRequestDto, getPlayListRequestDto, upsertCommentRequestDto } from './dto/songRequest';
import { Singer } from 'src/entities/Singer';
import { Video } from 'src/entities/Video';
import { PlayList } from 'src/entities/PlayList';
import { PlayListSong } from 'src/entities/PlayListSong';
import { Song } from 'src/entities/Song';
import { SingerRepository } from './repository/singer.repository';
import { VideoRepository } from './repository/video.repository';
import { LikesRepository } from './repository/Likes.repository';
import { CommentRepository } from './repository/comment.repository';
import { Comment } from 'src/entities/Comment';
import { Likes } from 'src/entities/Likes';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongRepository) private songRepository: SongRepository,
    @InjectRepository(PlayListSongRepository) private playlistSongRepository: PlayListSongRepository,
    @InjectRepository(VideoRepository) private videoRepository: VideoRepository,
    @InjectRepository(PlayListRepository) private playlistRepository: PlayListRepository,
    @InjectRepository(SingerRepository) private singerRepository: SingerRepository,
    @InjectRepository(LikesRepository) private likesRepository: LikesRepository,
    @InjectRepository(CommentRepository) private commentRepository: CommentRepository,
    private song : Song,
    private singer : Singer,
    private video : Video,
    private playList : PlayList,
    private playListSong : PlayListSong,
    private comment : Comment,
    private likes : Likes
  ) {}


  // 노래 playlist가져오기
  async getAllPlaylist( req : getPlayListRequestDto, page : PageRequestDto, uid : number) : Promise<Page<getPlaylistDto>>{
    try{
      const user = req.default == 0 ? 0 : uid;
      let playlist = await this.playlistRepository.getAllPlayList(user, page.page, page.size);

      let list = await Promise.all(playlist[0].map(async (playlistsong) => new getPlaylistDto(
        playlistsong,
        await this.playlistSongRepository.find({where : {playlist_id : playlistsong.id} , relations:['song']})
      )));

      const result = new Page<getPlaylistDto>(playlist[1] , page.size , list);
      return result;
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }

  
  // 노래 playlist 하나 가져오기
  async getAllPlaylistOne( playlist_id : number, uid : number) : Promise<returnResponse>{
    try{
      const user = uid? uid : 0;
      let playlist = await this.playlistRepository.findOneOrFail({id : playlist_id, uid : user});

      const result = new getPlaylistDto(
        playlist,
        await this.playlistSongRepository.find({where : {playlist_id : playlist.id} , relations:['song']})
      );

      return new returnResponse(Return.OK, result);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  // 노래 정보 디테일 정보 가져오기
  async getSongDetail( song_id : number, uid : number) : Promise<returnResponse>{
    try{
      let song = await this.songRepository.getSongInfo(song_id);

      let like;
      let comment;

      if( uid){
        comment = await this.commentRepository.find({where : {song_id : song_id, uid : uid}, order : {id : 'DESC'}});
        like = await this.likesRepository.findOne({where : {song_id : song_id, uid : uid}});
      }
      
      const result = new getSongDetailInfoDto(song, like, comment);

      return new returnResponse(Return.OK, result);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }

  //노래 등록하기 -> 나중에 관리자만 가능
  async SaveSong( req : UpsertSongRequestDto) : Promise<returnResponse>{
    try{
      let song = this.song.create( req);
      await this.songRepository.save(song, {reload : false});
    
      return new returnResponse(Return.OK)

    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }

  
  //노래 수정하기 > 나중에 관리자만 가능
  async updateSong( song_id : number, req : UpsertSongRequestDto) : Promise<returnResponse>{
    try{
      let song = await this.songRepository.findOneOrFail({ id : song_id});
      song.update(req);

      await this.songRepository.update({id : song.id}, song);
      return new returnResponse(Return.OK)
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }
  

  
  //비디오 등록하기 > 나중에 관리자만 가능
  async SaveVideo( req : UpsertVideoRequestDto) : Promise<returnIdResponse>{
    try{
      let video = this.video.create(req);
      video = await this.videoRepository.save(video);

      return new returnIdResponse(Return.OK, video.id);

    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }

  
  //비디오 수정하기
  async updateVideo( video_id : number, req : UpsertVideoRequestDto) : Promise<returnIdResponse>{
    try{
      let video = await this.videoRepository.findOneOrFail({id : video_id});
      video.update(req);

      await this.videoRepository.update({id : video.id}, video);
      return new returnIdResponse(Return.OK, video.id);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }
  


  //가수 등록하기 > 나중에 관리자만 가능
  async createSinger( req : UpsertSingerRequestDto) : Promise<returnIdResponse>{
    try{
      let singer = this.singer.create(req);
      singer = await this.singerRepository.save(singer);

      return new returnIdResponse(Return.OK, singer.id);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }



  //가수 수정하기 > 나중에 관리자만 가능
  async updateSinger( singer_id : number, req : UpsertSingerRequestDto) : Promise<returnIdResponse>{
    try{
      let singer = await this.singerRepository.findOneOrFail(singer_id);
      singer.update(req);

      await this.singerRepository.update(singer_id, singer);
      return new returnIdResponse(Return.OK, singer.id);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }



  //playlist 만들기 > 나중에 시스템 playlist 면  uid = 0처리 해줘야한다.
  async createPlayList( req : UpsertPlayListRequestDto, uid : number) : Promise<returnResponse>{
    try{
      let playlist = this.playList.create(req, uid);
      await this.playlistRepository.save(playlist);

      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }



  //playlist 수정하기 > 나중에 시스템 playlist 면  uid = 0처리 해줘야한다.
  async updatePlayList( playlist_id : number, req : UpsertPlayListRequestDto, uid : number) : Promise<returnResponse>{
    try{
      let playlist = await this.playlistRepository.findOneOrFail({id : playlist_id, uid : uid});
      playlist.update(req);

      await this.playlistRepository.update(playlist.id, playlist);
      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //playlist 삭제하기 > 나중에 시스템 playlist 면 관리자만 가능하게
  async deletePlayList( playlist_id : number, uid : number) : Promise<returnResponse>{
    try{
      let playlist = await this.playlistRepository.findOneOrFail({id : playlist_id, uid : uid});
      playlist.delete();

      await this.playlistRepository.update(playlist.id, playlist);
      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }



  //playlistSong 추가하기 > 나중에 시스템 playlist 면  uid = 0처리 해줘야한다.
  async addPlayListSong( req : UpsertPlayListRequestDto, uid : number) : Promise<returnResponse>{
    try{
      const playListSong = this.playListSong.create(req, uid);
      await this.playlistRepository.save(playListSong);

      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //playlistSong 삭제하기 > 나중에 시스템 playlist 면  uid = 0처리 해줘야한다.
  async deletePlayListSong( playlistSong_id : number, uid: number) : Promise<returnResponse>{
    try{
      const playlistSong = await this.playlistSongRepository.findOneOrFail({id : playlistSong_id, uid : uid});

      await this.playlistRepository.delete(playlistSong);
      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //노래 좋아요 누르기
  async addLike( req : addLikeRequestDto, uid : number) : Promise<returnResponse>{
    try{
      const likes = this.likes.create(req, uid);
      await this.playlistRepository.save(likes);

      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }



  //노래 좋아요 취소하기
  async deleteLike( like_id : number, uid : number) : Promise<returnResponse>{
    try{
      const likes = await this.likesRepository.findOneOrFail({ id : like_id, uid : uid});

      await this.likesRepository.delete(likes.id);
      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //노래 코멘트 남기기
  async addComment( req : upsertCommentRequestDto, uid : number) : Promise<returnResponse>{
    try{
      const comment = this.comment.create(req, uid);
      await this.commentRepository.save(comment);

      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //노래 코멘트 수정하기
  async updateComment( comment_id : number, req: upsertCommentRequestDto, uid : number) : Promise<returnResponse>{
    try{
      const comment = await this.commentRepository.findOneOrFail({ id : comment_id, uid : uid});
      comment.update(req);

      await this.commentRepository.update(comment.id, comment);
      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


  //노래 코멘트 삭제하기
  async deleteComment( comment_id : number, uid : number) : Promise<returnResponse>{
    try{
      const comment = await this.commentRepository.findOneOrFail({ id : comment_id, uid : uid});

      await this.commentRepository.delete(comment.id);
      return new returnResponse(Return.OK);
    }
    catch(err){
      throw new HttpException(err, err.status);
    }
  }


}
