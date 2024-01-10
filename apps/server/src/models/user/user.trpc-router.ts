import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserSchema } from '@shared/validation';
import { procedure, router } from '@server/apis/trpc/trpc.instance';

@Injectable()
export class UserTrpcRouter {
  constructor(private userService: UserService) {}

  routes = router({
    create: procedure.input(createUserSchema).mutation((opts) => {
      return this.userService.create(opts.input);
    }),
    findAll: procedure.query((opts) => {
      return this.userService.findAll();
    }),
  });
}
