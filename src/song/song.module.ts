
import { TypeOrmModule } from "@nestjs/typeorm";
import { SongRepository } from "./repository/song.repository";
import { SongService } from "./song.service";
import { Module } from "@nestjs/common";
import { SongController } from "./song.controller";
import { PlayListRepository } from "./repository/playlist.repository";
import { PlayListSongRepository } from "./repository/playlistSong.repository";
import { VideoRepository } from "./repository/video.repository";
import { SingerRepository } from "./repository/singer.repository";
import { LikesRepository } from "./repository/Likes.repository";
import { CommentRepository } from "./repository/comment.repository";
import { Song } from "src/entities/Song";
import { Singer } from "src/entities/Singer";
import { Comment } from "src/entities/Comment";
import { Likes } from "src/entities/Likes";
import { PlayList } from "src/entities/PlayList";
import { PlayListSong } from "src/entities/PlayListSong";
import { Video } from "src/entities/Video";

@Module({
  imports: [
    TypeOrmModule.forFeature([SongRepository, PlayListRepository, PlayListSongRepository, SongRepository, VideoRepository, SingerRepository,
    LikesRepository, CommentRepository]),
  ],
  providers: [SongService, Song, Singer, Comment, Likes, PlayList, PlayListSong, Video],
  controllers: [SongController],
})
export class SongModule {}