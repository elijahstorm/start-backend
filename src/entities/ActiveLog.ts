import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'db_start', name: 'activelog' })
export class ActiveLog {
    
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('varchar', { name: 'api' })
    api: string;

    @Column('json', { name: 'request' })
    request: object;

    @Column('timestamp', { name: 'date' , default: () => "CURRENT_TIMESTAMP"})
    date: string;

    public create( api : string, request : object, uid : number){
        const log = new ActiveLog();
        log.api = api;
        log.request = request;
        log.uid = uid;
        return log;
    }
}
  