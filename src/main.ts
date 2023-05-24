import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import winston from 'winston';
import morgan from 'morgan';
import {  WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './middlewares/httpException.filter';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
async function bootstrap() {

  dotenv.config();
  const transport = new winston.transports.DailyRotateFile({
    filename: 'log/%DATE%.log',
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.ms(),
      winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] ${info.message}`;
      }))

  });

  const transportError = new winston.transports.DailyRotateFile({
    filename: 'err/%DATE%.log',
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.ms(),
      winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] ${info.message}`;
      })
    ),
  });

  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.colorize(),
          winston.format.printf((info) => {
            console.log()
            return `${info.timestamp} [${info.level}] ${info.message} -  `
          })
        ),
      }),
      transport,
      transportError
    ],
  });

  const app = await NestFactory.create<NestExpressApplication>(AppModule,{  cors: true, logger:logger });
  const port = process.env.PORT || 3001;
  const httpLogStream = {
    write: (message: string) => { logger.log(message.substring(0, message.lastIndexOf("\n"))); }
  };

  const config = new DocumentBuilder()
    .setTitle('START:T')
    .setDescription('START:t api document')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.useStaticAssets(join(__dirname, '..', 'static'));
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
      transform : true
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(logger);
  app.use(morgan(':method :url HTTP/:http-version :status :res[content-length] :remote-addr - :remote-user  :response-time ms', { stream: httpLogStream }));

  await app.listen(port);
  console.log(`listening on port ${port}`)


}
bootstrap();
