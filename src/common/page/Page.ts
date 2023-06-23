
import { ApiProperty} from '@nestjs/swagger';
import { Return } from '../Enum';

export class Page<T> {
    @ApiProperty({description: 'success ( 1 : success)'})
    success: number;

    @ApiProperty({description: '한번에 출력될 개수'})
    pageSize: number;

    @ApiProperty({description: '총 개수'})
    totalCount: number;

    @ApiProperty({
        description: '총 페이지 수'})
    totalPage: number;

    @ApiProperty({ type : "array"})
    items: T[];

    constructor(totalCount: number, pageSize: number, items: T[]) {
        this.success = Return.OK;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.totalPage = Math.ceil(totalCount/pageSize);
        this.items = items;
    }
}