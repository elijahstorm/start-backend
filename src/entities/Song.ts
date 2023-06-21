import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'song', name: 'song' })
export class Song {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'video_id' })
    video_id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'length' })
    length: string;

    @Column('timestamp', { name: 'save_date', default: () => "CURRENT_TIMESTAMP"})
    save_date: string;

    @Column('timestamp', { name: 'update_date', default: () => "CURRENT_TIMESTAMP"})
    update_date: string;

    @Column('int', { name: 'cost', default:0})
    cost: number;
}
  