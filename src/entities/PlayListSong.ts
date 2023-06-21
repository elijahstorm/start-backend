import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'playlistsong', name: 'playlistsong' })
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

}
  