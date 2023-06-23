import { Injectable } from '@nestjs/common';
import { Column,  Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PlayListSong } from './PlayListSong';
import { User } from './User';
import moment from 'moment';
import { UpsertPlayListRequestDto } from 'src/song/dto/songRequest';

@Injectable()
@Entity({ schema: 'db_start', name: 'playlist' })
export class PlayList {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'uid' })
    uid: number;

    @Column('varchar', { name: 'title' })
    title: string;
    
    @Column('timestamp', { name: 'created_at', default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @Column('timestamp', { name: 'updated_at', default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;

    @Column('tinyint', { name: 'is_deleted' , default : 0})
    is_deleted: number;

    @OneToMany(()=> PlayListSong, playlistSong => playlistSong.playlist)
    playlistSong : PlayListSong[];
  

    public create( req : UpsertPlayListRequestDto, uid : number){
        const playlist = new PlayList;
        playlist.uid = uid;
        playlist.title = req.title;
        playlist.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        return playlist;
    }

    public update( req : UpsertPlayListRequestDto){
        const playlist = new PlayList;
        playlist.title = req.title;
        playlist.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        return playlist;
    }

    public delete(){
        this.is_deleted = 1;
        return this;
    }
}
  