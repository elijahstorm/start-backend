
import { TypeOrmModule } from "@nestjs/typeorm";
import { SongRepository } from "./repository/song.repository";
import { SongService } from "./song.service";
import { Module } from "@nestjs/common";
import { SongController } from "./song.controller";
import { PlayListRepository } from "./repository/playlist.repository";
import { PlayListSongRepository } from "./repository/playlistSong.repository";
import { VideoRepository } from "./repository/video.repository";
import { SingerRepository } from "./repository/singer.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([SongRepository, PlayListRepository, PlayListSongRepository, SongRepository, VideoRepository, SingerRepository]),
  ],
  providers: [SongService],
  controllers: [SongController],
})
export class SongModule {}