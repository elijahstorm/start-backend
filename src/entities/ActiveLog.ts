import { Injectable } from '@nestjs/common';
import { Column,  CreateDateColumn,  Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'grade', name: 'grade' })
export class ActiveLog {
    
    @PrimaryColumn({ type: 'bigint', name: 'id' })
    id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('varchar', { name: 'api' })
    api: string;

    @Column('json', { name: 'request' })
    request: object;

    @Column('timestamp', { name: 'date' , default : 'now()'})
    date: string;

    public create( api : string, request : object, uid : number){
        const log = new ActiveLog();
        log.api = api;
        log.request = request;
        log.uid = uid;
    }
}
  