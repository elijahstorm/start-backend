import { Module } from '@nestjs/common';
import { emailController as EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
const email = process.env.EMAIL + '@' +process.env.EMAIL_DOMAIN;

@Module({
    imports: [
      MailerModule.forRoot({
        transport: {        
          host: `smtp.${process.env.EMAIL_DOMAIN}`,
          port: 587,
          auth: {
            user: email,
            pass: process.env.EMAIL_PASSWORD,
          }
        },
        defaults: {
          from: `'${email}' <${email}>`,
        },
        preview: true,
        template : {
          dir : 'dist/common/email/template',
          adapter : new EjsAdapter()
        }
      }),
      ],
      providers: [ EmailService],
      controllers: [ EmailController],

})
export class EmailModule {}
