import { Injectable } from '@nestjs/common';
import { Column,  Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Injectable()
@Entity({ schema: 'grade', name: 'grade' })
export class Grade {
    
    @PrimaryColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

}
  