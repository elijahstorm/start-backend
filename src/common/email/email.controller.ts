
import { Body, Post, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmailService } from "./email.service";

@ApiTags('test')
@Controller('mail')
export class emailController {

    constructor(
        private emailService : EmailService
    ) { }    
    
    @ApiOperation({ summary: '메일 테스트하기' })
    @Post('/fail')
    async getfaillog(
        @Body() req ,
        @Res() res
        ){  
            return await this.emailService.sendTempPW(req.email, req.password, req.template, req.title);
    }
}
