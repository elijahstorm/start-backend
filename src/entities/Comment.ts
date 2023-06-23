import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { upsertCommentRequestDto } from 'src/song/dto/songRequest';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'db_start', name: 'comment' })
export class Comment {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('bigint', { name: 'song_id' })
    song_id: number;

    @Column('varchar', { name: 'comment' })
    comment: string;

    @Column('timestamp', { name: 'date', default: () => "CURRENT_TIMESTAMP"})
    date: string;


    public create( req : upsertCommentRequestDto, uid : number){
        const comment = new Comment;
        comment.uid = uid;
        comment.song_id = req.song_id;
        comment.comment = req.comment;

        return comment;
    }

    public update( req : upsertCommentRequestDto){
        this.song_id = req.song_id;
        this.comment = req.comment;
        this.date = moment().format('YYYY-MM-DD HH:mm:ss');

        return this;
    }
}
  