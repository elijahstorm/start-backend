import { Injectable } from '@nestjs/common';
import { Column,  Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PlayList } from './PlayList';
import { Song } from './Song';
import moment from 'moment';

@Injectable()
@Entity({ schema: 'db_start', name: 'playlistsong' })
export class PlayListSong {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'song_id' })
    song_id: number;

    @Column('bigint', { name: 'playlist_id' })
    playlist_id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('int', { name: 'index' })
    index: number;
    
    @Column('timestamp', { name: 'updated_at', default: () => "CURRENT_TIMESTAMP"})
    updated_at: string;

    @ManyToOne(type => PlayList, playlist => playlist.playlistSong)
    @JoinColumn({name : 'playlist_id'})
    playlist: PlayList;

    @OneToOne(type => Song)
    @JoinColumn({name : 'song_id'})
    song: Song;

    
    public create( req, uid : number){
        const playlistSong = new PlayListSong;
        playlistSong.uid = uid;
        playlistSong.song_id = req.song_id;
        playlistSong.playlist_id = req.playlist_id;
        playlistSong.index = req.index;
        playlistSong.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

        return playlistSong;
    }


}
  