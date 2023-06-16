
import { ApiProperty} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty} from 'class-validator';

export class PageRequestDto {
    @ApiProperty({
        description: '페이지 index (0부터 시작)',
        example : 0
      })
    @IsNotEmpty()
    page: number;

    @ApiProperty({
        description: '한 페이지에 출력할 개수',
        example : 10
      })
    @IsNotEmpty()
    size: number;

}