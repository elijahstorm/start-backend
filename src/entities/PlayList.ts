import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'playlist', name: 'playlist' })
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

    @Column('tinyint', { name: 'is_deleted' })
    is_deleted: number;

}
  