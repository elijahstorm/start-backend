import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class returnResponse {
    @ApiProperty({description: 'success ( 1 : success)'})
    @Exclude() private readonly success: number;

    @ApiProperty({description: 'result'})
    @Exclude() private readonly result: any;

    constructor(success : number, result = undefined) {
        this.success = Number(success);
        this.result = result;
    }
}


export class returnIdResponse {
    @ApiProperty({description: 'success ( 1 : success)'})
    @Exclude() private readonly success: number;

    @ApiProperty({description: 'id'})
    @Exclude() private readonly id: number;

    constructor(success : number, id : number) {
        this.success = Number(success);
        this.id = Number(id);
    }
}


export class returnErrorResponse {
    @ApiProperty({description: 'success ( 1 : success, 0 :fail)'})
    @Exclude() private readonly success: number;

    @ApiProperty({description: 'fail code(400 : code error, others : rule error'})
    @Exclude() private readonly code: number;

    @ApiProperty({description: 'error message'})
    @Exclude() private readonly data: string;
}

