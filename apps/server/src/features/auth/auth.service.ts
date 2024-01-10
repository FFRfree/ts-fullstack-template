import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { signInSchema } from '@shared/validation';
import { z } from 'zod';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(params: z.infer<typeof signInSchema>) {
    const { username, password } = params;
    const user = await this.userService.findByName(username);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
