import { Exclude } from "class-transformer";
import { ApiProperty} from '@nestjs/swagger';
import { PlayListSong } from "src/entities/PlayListSong";
import { PlayList } from "src/entities/PlayList";
import { Song } from "src/entities/Song";


export class getPlaylistDto {
    @ApiProperty({description: 'playlist_id'})
    @Exclude() private readonly playlist_id: number | null;

    @ApiProperty({description: 'title'})
    @Exclude() private readonly title: string | null;

    @ApiProperty({description: 'songList'})
    @Exclude() private readonly songList: getPlaylistSongInfoDto[] | null;


    constructor(entity : PlayList, song : PlayListSong[]) {
        this.playlist_id = Number(entity.id);
        this.title = entity.title;
        this.songList = song.map((song) => new getPlaylistSongInfoDto(song));
    }
}


export class getPlaylistSongInfoDto {
    @ApiProperty({description: 'songIndex'})
    @Exclude() private readonly songIndex: number | null;

    @ApiProperty({description: 'song_id'})
    @Exclude() private readonly song_id: number | null;

    @ApiProperty({description: 'song_name'})
    @Exclude() private readonly song_name: string | null;

    @ApiProperty({description: 'song_image'})
    @Exclude() private readonly song_image: string | null;

    constructor(entity : PlayListSong) {
        this.songIndex = Number(entity.index);
        this.song_id = Number(entity.song?.id);
        this.song_name = entity.song?.name;
        this.song_image = entity.song.image;
    }
}


export class getSongDetailInfoDto {

    @ApiProperty({description: 'song_id'})
    @Exclude() private readonly song_id: number | null;

    @ApiProperty({description: 'song_name'})
    @Exclude() private readonly song_name: string | null;

    @ApiProperty({description: 'song_image'})
    @Exclude() private readonly song_image: string | null;

    @ApiProperty({description: 'song_lengh'})
    @Exclude() private readonly song_lengh: string | null;

    @ApiProperty({description: 'cost'})
    @Exclude() private readonly cost: number | null;

    @ApiProperty({description: 'video_url'})
    @Exclude() private readonly video_url: string | null;

    @ApiProperty({description: 'video_name'})
    @Exclude() private readonly video_name: string | null;

    @ApiProperty({description: 'singer_name'})
    @Exclude() private readonly singer_name: string | null;

    @ApiProperty({description: 'singer_descrition'})
    @Exclude() private readonly singer_descrition: string | null;


    constructor(entity : Song) {
        this.song_id = Number(entity.id);
        this.song_name = entity.name;
        this.song_lengh = entity.length;
        this.song_image = entity.image;
        this.cost = Number(entity.cost);
        this.video_url = entity.video?.url;
        this.video_name = entity.video?.name;
        this.singer_name = entity.singer?.name;
        this.singer_descrition = entity.singer?.descrition;
    }
}


