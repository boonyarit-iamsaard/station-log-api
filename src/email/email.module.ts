import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';

import { EmailService } from './services/email.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_HOST'),
          port: configService.get('SMTP_PORT'),
          secure: configService.get('SMTP_SECURE'),
          auth: {
            user: configService.get('SMTP_USER'),
            pass: configService.get('SMTP_PASS'),
          },
          tls: {
            ciphers: 'SSLv3',
          },
        },
        defaults: {
          from: `"noreply@${configService.get(
            'ORIGIN_URL',
          )}" <${configService.get('SMTP_USER')}>`,
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule,
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
