import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'user', name: 'user' })
export class User {
    
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'uid' })
    uid: number;

    @Column('int', { name: 'grade', default : 100 })
    grade: number;

    @Column('varchar', { name: 'email', default : true })
    email: string;

    @Column('varchar', { name: 'nickname', unique : true })
    nickname: string;

    @Column('varchar', { name: 'first_name', nullable : false })
    first_name: string;

    @Column('varchar', { name: 'last_name', nullable : false })
    last_name: string;
  
    @Column('varchar', { name: 'password', nullable : false })
    password: string;

    @Column('timestamp', { name: 'email_varification_time', nullable : true })
    email_varification_time: string;
    
    @CreateDateColumn({ name : 'joindate'})
    joindate: string;

    @Column('tinyint', { name: 'trycnt', default : 0 })
    trycnt: number;


  
    public join(email : string, password : string, nickname : string, first_name : string, last_name : string){
        const user = new User;
        user.email = email;
        user.password = password;
        user.nickname = nickname;
        user.first_name = first_name;
        user.last_name = last_name;
        return user;
    }

    public emailVarificated(){
        this.email_varification_time = moment().format('YYYY-MM-DD HH:mm:ss');
        return this;
    }

    public addTryCount(){
        this.trycnt = this.trycnt + 1 ;
        return this;
    }

    public resetTryCount(){
        this.trycnt = 0;
        return this;
    }
}
  