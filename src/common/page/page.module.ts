import { Module } from '@nestjs/common';
import { Page } from './Page';
import { PageRequestDto } from './PageRequest';
@Module({
    imports: [
      PageModule,
      Page,
      PageRequestDto],
    controllers: [],
    providers: [],
  })
export class PageModule {}