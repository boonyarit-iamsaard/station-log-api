import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { username } });
    const matched = user && (await bcrypt.compare(password, user.password));

    if (!user || !matched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return new User(user);
  }
}
