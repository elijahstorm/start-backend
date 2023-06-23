import { Injectable } from '@nestjs/common';
import { Column,  Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Song } from './Song';
import moment from 'moment';
import { UpsertSingerRequestDto } from 'src/song/dto/songRequest';

@Injectable()
@Entity('singer', { schema: 'db_start'})
export class Singer {
    
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('text', { name: 'descrition' })
    descrition: string;

    @Column('timestamp', { name: 'update_date', default: () => "CURRENT_TIMESTAMP"})
    update_date: string;

    @OneToMany(()=> Song, song => song.singer)
    song : Song[];
  

    public create( req : UpsertSingerRequestDto){
        const singer = new Singer;
        singer.name = req.name;
        singer.descrition = req.descrition;
        return singer;
    }

    public update( req : UpsertSingerRequestDto){
        this.name = req.name;
        this.descrition = req.descrition;
        this.update_date = moment().format('YYYY-MM-DD HH:mm:ss');
        return this;
    }
}
  