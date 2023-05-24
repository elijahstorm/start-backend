import { Exclude } from "class-transformer";
import { ApiProperty} from '@nestjs/swagger';

export class loginInfo {
    @ApiProperty({description: '채팅방Id'})
    @Exclude() private readonly id: number;

    constructor(roomId : number) {
        this.id = Number(roomId);

    }
}

