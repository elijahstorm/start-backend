import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeORMConfig } from './database.providers';
import { AuthModule } from './auth/auth.module';
import { PageModule } from './common/page/page.module';
import { FileModule } from './common/file/file.module';
import { EmailModule } from './common/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter} from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig[0]),
    UsersModule,
    AuthModule,
    PageModule,
    FileModule,

    EmailModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) : any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
