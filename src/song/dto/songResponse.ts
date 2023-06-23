import { Exclude } from "class-transformer";
import { ApiProperty} from '@nestjs/swagger';
import { PlayListSong } from "src/entities/PlayListSong";
import { PlayList } from "src/entities/PlayList";
import { Song } from "src/entities/Song";
import { Likes } from "src/entities/Likes";
import { Comment } from "src/entities/Comment";
import moment from "moment";


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


export class getPlaylistDto {
    @ApiProperty({description: 'playlist_id'})
    @Exclude() private readonly playlist_id: number | null;

    @ApiProperty({description: 'title'})
    @Exclude() private readonly title: string | null;

    @ApiProperty({description: 'songList', type :  [getPlaylistSongInfoDto]})
    @Exclude() private readonly songList: getPlaylistSongInfoDto[] | null;


    constructor(entity : PlayList, song : PlayListSong[]) {
        this.playlist_id = Number(entity.id);
        this.title = entity.title;
        this.songList = song.map((song) => new getPlaylistSongInfoDto(song));
    }
}



export class getCommentDto {
    @ApiProperty({description: 'comment_id'})
    @Exclude() private readonly comment_id: number | null;

    @ApiProperty({description: 'comment'})
    @Exclude() private readonly comment: string | null;

    @ApiProperty({description: 'last_update date'})
    @Exclude() private readonly date: string | null;

    constructor(entity : Comment) {
        this.comment_id = Number(entity.id);
        this.comment = entity.comment;
        this.date = moment(entity.date).format('YYYY-MM-DD HH:mm:ss');
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

    @ApiProperty({description: 'like'})
    @Exclude() private readonly like: boolean | null;

    @ApiProperty({description: 'user comment', type : getCommentDto})
    @Exclude() private readonly comment: getCommentDto[]| null;


    constructor(entity : Song, like : Likes, comment : Comment[]) {
        this.song_id = Number(entity.id);
        this.song_name = entity.name;
        this.song_lengh = entity.length;
        this.song_image = entity.image;
        this.cost = Number(entity.cost);
        this.video_url = entity.video?.url;
        this.video_name = entity.video?.name;
        this.singer_name = entity.singer?.name;
        this.singer_descrition = entity.singer?.descrition;
        this.like = like? true : false;
        this.comment = comment.map((comment) => new getCommentDto(comment));
    }
}



