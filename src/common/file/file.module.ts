import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
    imports: [
     
    ],
    controllers: [FileController],
    providers: [FileService, AwsService],
  })
export class FileModule {}