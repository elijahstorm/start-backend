import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
  } from '@nestjs/common';
import { Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request =  JSON.stringify(ctx.getRequest().body);
      const status = exception.getStatus();
      const err = exception.getResponse() as
        | { message: any; statusCode: number }
        | { error: string; statusCode: 400; message: string[] }; // class-validator 타이핑

  
      if ( ( typeof err !== 'string' && err.statusCode === 400) || status == null ) {
        // class-validator error OR logic error
        Logger.error(`url : ${ctx.getRequest().url}, code : ${status}, message : ${err.message}, \n request : ${request}  \n stack : ${exception.stack}`);
        return response.status(status).json({
          success : 0,
          code: status,
          data: JSON.stringify(err.message)
        });
      }

      else {  // rule error
        Logger.warn(`url : ${ctx.getRequest().url}, code : ${status}, message : ${err.message}, \n request : ${request}  \n stack : ${exception.stack}`);
        return response.status(400).json({
          success : 0,
          code: status,
          data: err.message
        });      
      }
    }
  }