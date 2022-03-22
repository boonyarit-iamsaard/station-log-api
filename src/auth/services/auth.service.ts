import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { EmailService } from '../../email/services/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { username } });
    const matched = user && (await bcrypt.compare(password, user.password));

    if (!user || !matched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new User(user);
  }

  login(user: User) {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload);
  }

  resetPassword(user: User) {
    const token = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: 60 * 15 }, // 15 minutes
    );

    this.emailService.sendPasswordResetEmail(user, token);
  }
}
