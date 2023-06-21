import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'video', name: 'video' })
export class Video {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'url' })
    url: string;

    @Column('varchar', { name: 'name' })
    name: string;
    
    @Column('timestamp', { name: 'save_date', default: () => "CURRENT_TIMESTAMP"})
    save_date: string;

    @Column('timestamp', { name: 'update_date', default: () => "CURRENT_TIMESTAMP"})
    update_date: string;

}
  