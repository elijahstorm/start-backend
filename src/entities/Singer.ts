import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'singer', name: 'singer' })
export class Singer {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('bigint', { name: 'song_id' })
    song_id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('text', { name: 'descrition' })
    descrition: string;

    @Column('timestamp', { name: 'update_date', default: () => "CURRENT_TIMESTAMP"})
    update_date: string;

}
  