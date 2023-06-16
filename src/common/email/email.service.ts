import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable, Logger } from '@nestjs/common';


@Injectable()
export class EmailService {

    constructor(
        private readonly mailerService: MailerService
    ) { }
    
    async send( email : string, title: string, password : string, template : string): Promise<any> {
        try{
            const result = this.mailerService
                .sendMail({
                    to: email , // list of receivers 
                    from: process.env.EMAIL, // sender address
                    subject: title, // Subject line
                    template : `dist/common/email/template/${template}.ejs`,
                    context : {
                        email : email,
                        password : password,
                        url : `${process.env.ADMIN_URL}/login`
                    }
                });
            return result;
        }
        catch(err){
            throw new HttpException(err, 400);
        }
    }

    async sendTempPW( email : string, password : string) : Promise<any>{
        try{
            const result = await this.send( email, "start:T - validCode", password, "changePWTemplate");
            Logger.log(result);
            return result;
        }   
        catch(err){
            throw new HttpException( err, 404);
        }
    }

}
