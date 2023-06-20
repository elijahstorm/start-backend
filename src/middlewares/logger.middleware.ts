import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ActiveLog } from 'src/entities/ActiveLog';
import { getConnection } from 'typeorm';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', async () => {
        const { statusCode } = response;
        const requests =  JSON.stringify(request.body);
        Logger.log(
            `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip}`
        );
        Logger.log( requests );

        if( request.method != 'GET' && request.body.uid ){
          const queryRunner = getConnection().createQueryRunner();

          try{
            await queryRunner.connect();
            const active_log = new ActiveLog();
            active_log.api = originalUrl.split('/api/')[1];
            active_log.uid = request.body.uid;
            active_log.request = request.body;
            
            await queryRunner.manager.save<ActiveLog>(active_log, {reload : false});
          }
          
          catch(err){
            Logger.log( "fail leave active log : " + err );
          }
        }

    });

    next();
  }
}