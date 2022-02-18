import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../common/types/authenticated-request.interface';
import { SessionAuthGuard } from '../guards/session-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: AuthenticatedRequest) {
    return request.user;
  }

  @UseGuards(SessionAuthGuard)
  @Post('logout')
  async logout(@Req() request: AuthenticatedRequest) {
    request.logout();
    request.session.cookie.maxAge = 0;
  }
}
