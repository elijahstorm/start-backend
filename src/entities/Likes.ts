import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'likes', name: 'likes' })
export class Likes {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('bigint', { name: 'song_id' })
    song_id: number;

    @Column('timestamp', { name: 'date', default: () => "CURRENT_TIMESTAMP"})
    date: string;

}
  