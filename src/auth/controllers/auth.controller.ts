import { ConfigService } from '@nestjs/config';
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../../common/types/authenticated-request.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UsersService } from '../../users/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: AuthenticatedRequest, @Res() response: Response) {
    const jwt = this.authService.login(request.user);
    const secure = process.env.NODE_ENV === 'production';
    const { id, name, email, roles } = request.user;

    response
      .cookie('jwt', jwt, {
        maxAge: this.configService.get('JWT_EXPIRES_IN') * 1000, // 1 hour (in milliseconds)
        secure,
        httpOnly: true,
        path: '/',
      })
      .json({
        id,
        name,
        email,
        roles,
      });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() response: Response) {
    response
      .cookie('jwt', '', {
        maxAge: 0,
        path: '/',
      })
      .status(200)
      .send();
  }

  @Post('reset-password')
  async resetPassword(@Body() { email }: { email: string }) {
    const existingUser = await this.usersService.findOne({ where: { email } });

    if (!existingUser) {
      throw new NotFoundException('User not found with that email');
    }

    return this.authService.resetPassword(existingUser);
  }
}
