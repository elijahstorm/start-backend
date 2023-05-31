import { Injectable } from '@nestjs/common';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'tempCode', name: 'tempCode' })
export class tempCode {
    
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: number;

    @Column('bigint', { name: 'uid' })
    uid: number;

    @Column('tinyint', { name: 'type' })
    type: number;

    @Column('varchar', { name: 'code' })
    code: string;

    @Column('int', { name: 'trycnt' })
    trycnt: number;

    @UpdateDateColumn({ name : 'send_date'})
    send_date: string;
  
    public create(type : number, code : string , uid : number){
        const temp = new tempCode;
        temp.type = type;
        temp.code = code ;
        temp.trycnt = 0;
        return temp;
    }

    public update(){
        this.trycnt = this.trycnt + 1;
        return this;
    }
}
  