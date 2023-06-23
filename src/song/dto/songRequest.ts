import { ApiProperty} from '@nestjs/swagger';

export class getPlayListRequestDto {

    @ApiProperty({
        description: '0 : system, 1 : user (playlist owner)'})
    default: number;
}


export class UpsertSongRequestDto {
    @ApiProperty({
        description: 'song name'})
    name: string;

    @ApiProperty({
        description: 'song length'})
    length: string;

    @ApiProperty({
        description: 'song cost'})
    cost: number;

    @ApiProperty({
        description: 'song image url'})
    image: string;

    @ApiProperty({
        description: 'vido_id'})
    video_id: number;

    @ApiProperty({
        description: 'singer_id'})
    singer_id: number;

}

export class UpsertVideoRequestDto {
    @ApiProperty({
        description: 'vido_name'})
    video_name: string;

    @ApiProperty({
        description: 'vido_url'})
    video_url: string;
}


export class UpsertSingerRequestDto {
    @ApiProperty({
        description: 'singer name'})
    name: string;

    @ApiProperty({
        description: 'singer description'})
    descrition: string;

}


export class UpsertPlayListRequestDto {
    @ApiProperty({
        description: 'playlist title'})
    title: string;
}


export class AddPlayListSongRequestDto {
    @ApiProperty({
        description: 'song_id'})
    song_id: number;

    @ApiProperty({
        description: 'playlist_id'})
    playlist_id: number;

    @ApiProperty({
        description: 'index'})
    index: number;
}



export class addLikeRequestDto {
    @ApiProperty({
        description: 'song_id'})
    song_id: number;

}


export class upsertCommentRequestDto {
    @ApiProperty({
        description: 'song_id'})
    song_id: number;

    @ApiProperty({
        description: 'comment'})
    comment: string;
}
