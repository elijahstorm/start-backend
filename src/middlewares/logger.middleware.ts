import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
        const { statusCode } = response;
        const requests =  JSON.stringify(request.body);
        Logger.log(
            `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`
        );
        Logger.log( requests );

    });

    next();
  }
}