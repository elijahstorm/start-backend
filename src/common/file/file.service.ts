import {  HttpException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { AwsService } from './aws.service';

@Injectable()
export class FileService {
    constructor(
        private awsService : AwsService,
    ) {}

    //엑셀 파일 읽기
    async ReadFile( file : Express.Multer.File): Promise<any> {
        try {
            const workbook = XLSX.read(file.buffer, { type: 'buffer' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // sheet 의 정보를 json array 로 변환합니다.
            const rows = XLSX.utils.sheet_to_json(sheet, {
                defval: null,
            });
        
            return rows;
        }
        catch (err) {
            throw new HttpException(err, 400);
        }
    }

        
    //이미지 추가하기
    async uploadFiles( file : Express.Multer.File):Promise<string> {
        try {
            const key = await this.awsService.uploadFileToS3(`FAQ`, file);
            return key.key;
        }
        catch (err) {
            throw new HttpException(err, 400);
        }
    }


    //이미지 삭제하기
    async deleteFiles( req ):Promise<any> {
        try {
                await this.awsService.deleteS3Object(req.key);
        }
        catch (err) {
            throw new HttpException(err, 400);
        }
    }

    //구글 이미지 추가하기
    async uploadgoogleFiles( file : Express.Multer.File):Promise<any> {
        try {
            const result = await this.awsService.uploadFileToS3(process.env.FIRE_VER + '/admin', file);
            return result.key;
        }
        catch (err) {
            throw new HttpException(err, 400);
        }
    }
    

  
}