import { Injectable } from '@nestjs/common';
import { Column,  Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Video } from './Video';
import { Singer } from './Singer';
import { SongController } from 'src/song/song.controller';
import moment from 'moment';
import { UpsertSongRequestDto } from 'src/song/dto/songRequest';

@Injectable()
@Entity({ schema: 'db_start', name: 'song' })
export class Song {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'video_id' })
    video_id: number;

    @Column('bigint', { name: 'singer_id' })
    singer_id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'image' })
    image: string;

    @Column('varchar', { name: 'length' })
    length: string;

    @Column('timestamp', { name: 'save_date', default: () => "CURRENT_TIMESTAMP"})
    save_date: string;

    @Column('timestamp', { name: 'update_date', default: () => "CURRENT_TIMESTAMP"})
    update_date: string;

    @Column('int', { name: 'cost', default:0})
    cost: number;

    @OneToOne(type => Video, video => video.song)
    @JoinColumn({name : "video_id"})
    video: Video;

    @ManyToOne(type => Singer, singer => singer.song)
    @JoinColumn({name : "singer_id"})
    singer: Singer;


    public create( req : UpsertSongRequestDto){
        const song = new Song;
        song.name = req.name;
        song.length = req.length;
        song.cost = req.cost;
        song.video_id = req.video_id;
        song.singer_id = req.singer_id;

        return song;
    }

    public update( req : UpsertSongRequestDto){
        this.name = req.name;
        this.length = req.length;
        this.cost = req.cost;
        this.update_date = moment().format('YYYY-MM-DD HH:mm:ss');
        this.singer_id = req.singer_id;

        return this;
    }
}
  