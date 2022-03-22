import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from '../../users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendPasswordResetEmail(user: User, token: string) {
    const { email, name } = user;
    const url = `${this.configService.get(
      'ORIGIN_URL',
    )}/reset-password?token=${token}`;

    // TODO: add error handling
    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Reset password',
        template: 'reset-password',
        context: {
          url,
          name: name.split(' ')[0],
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
