import { Body, Controller, Get, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { FileService } from './file.service';

@ApiTags('file')
@Controller('file')
export class FileController {

    constructor(
        private fileService: FileService
        ) { }    


    @ApiOperation({ summary: '파일 올리기' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({ schema: {
        type: 'object',
        properties: {
        'file': { 
         type:'string',
         format: 'binary',
         description: `{
            fieldname: 'file',
            originalname: 'test.png',
            encoding: '7bit',
            mimetype: 'image/*',
            buffer: <Buffer 3c 20 2e 2f 2e 2e 2f 75 70 6c 6f 61 64 73 2f 74 65 73 74 2e 70 6e 67 0d 0a>,
            size: 25
          }`
        }
    }}})
    @Post()
    async uploadFile(
        @UploadedFile() file : Express.Multer.File
        ){
            return await this.fileService.uploadgoogleFiles(file);
    }


    
    @ApiOperation({ summary: '파일 리스트 삭제하기' })
    @Post('/delete')
    async deleteFile(
        @Body() key ,
        @Res() res,
        ): Promise<any>{
            await this.fileService.deleteFiles(key);
            return res.send(200);
    }

   
    

}

