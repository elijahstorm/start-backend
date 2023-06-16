import { Module } from '@nestjs/common';
import { emailController as EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
    imports: [
      MailerModule.forRoot({
        transport: `smtps://${process.env.EAMIL}:${process.env.ADMIN_PASSWORD}@smtp.worksmobile.com`,
        defaults: {
          from: `"${process.env.EAMIL}" <${process.env.EAMIL}>`,
        },
        preview: true,
        template : {
          dir : 'dist/common/email/template',
          adapter : new EjsAdapter()
        }
      }),
      ],
      providers: [ EmailService , EmailService],
      controllers: [ EmailController],

})
export class EmailModule {}
