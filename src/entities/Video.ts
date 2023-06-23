import { Injectable } from '@nestjs/common';
import { Column,  Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './Song';
import moment from 'moment';
import { UpsertSongRequestDto, UpsertVideoRequestDto } from 'src/song/dto/songRequest';

@Injectable()
@Entity({ schema: 'db_start', name: 'video' })
export class Video {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'url' })
    url: string;

    @Column('varchar', { name: 'name' })
    name: string;
    
    @Column('timestamp', { name: 'save_date', default: () => "CURRENT_TIMESTAMP"})
    save_date: string;

    @Column('timestamp', { name: 'update_date', default: () => "CURRENT_TIMESTAMP"})
    update_date: string;

    @OneToOne(type => Song, song => song.video)
    song: Song;


    public create( req : UpsertVideoRequestDto){
        const video = new Video;
        video.name = req.video_name;
        video.url = req.video_url;

        return video;
    }

    public update( req : UpsertVideoRequestDto){
        this.name = req.video_name;
        this.url = req.video_url;
        this.update_date = moment().format('YYYY-MM-DD HH:mm:ss');

        return this;
    }
}
  