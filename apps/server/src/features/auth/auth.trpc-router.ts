import { Injectable } from '@nestjs/common';
import { createUserSchema, signInSchema } from '@shared/validation';
import { procedure, router } from '@server/apis/trpc/trpc.instance';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTrpcRouter {
  constructor(private authService: AuthService) {}

  routes = router({
    register: procedure.input(createUserSchema).mutation((opts) => {
      return this.authService.register(opts.input);
    }),
    signIn: procedure.input(signInSchema).query((opts) => {
      return this.authService.signIn(opts.input);
    }),
  });
}
