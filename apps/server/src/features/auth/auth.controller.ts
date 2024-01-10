import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto, signInSchema } from '@shared/validation';
import { AuthService } from './auth.service';
import { ZodPipe } from '@server/common/pipes/zod.pipe';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-in')
  async signIn(@Body(new ZodPipe(signInSchema)) payload: SignInDto) {
    const payload1 = signInSchema.parse(payload);
    return await this.authService.signIn(payload1);
  }
}
