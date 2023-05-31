import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeORMConfig } from './database.providers';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig[0]),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) : any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
