import { Injectable } from '@nestjs/common';
import { addLikeRequestDto } from 'src/song/dto/songRequest';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'db_start', name: 'likes' })
export class Likes {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('bigint', { name: 'song_id' })
    song_id: number;

    @Column('timestamp', { name: 'date', default: () => "CURRENT_TIMESTAMP"})
    date: string;

    public create( req : addLikeRequestDto, uid : number){
        const like = new Likes;
        like.uid = uid;
        like.song_id = req.song_id;

        return like;
    }
}
  