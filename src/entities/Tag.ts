import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'tag', name: 'tag' })
export class Tag {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'song_id' })
    song_id: number;

    @Column('bigint', { name: 'tag_id' })
    tag_id: number;

}
  