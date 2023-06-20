import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable, Logger } from '@nestjs/common';


@Injectable()
export class EmailService {

    constructor(
        private readonly mailerService: MailerService
    ) { }
    
    async send( email : string, title: string, append : object, template : string): Promise<any> {
        try{
            const mail =  {
                to: email , // list of receivers 
                from: process.env.EMAIL+'@'+process.env.EMAIL_DOMAIN, // sender address
                subject: title, // Subject line
                template : `${template}.ejs`,
                context : append
            } 
            const result = this. mailerService.sendMail(mail);
            return result;
        }                                 
        catch(err){
            throw new HttpException(err, 400);
        }
    }

    async sendTempPW( email : string, append : object, templateName : string, title : string) : Promise<any>{
        try{
            const result = await this.send( email, title, append, templateName);
            Logger.log(result);
            return result;
        }   
        catch(err){
            throw new HttpException( err, 404);
        }
    }

}
