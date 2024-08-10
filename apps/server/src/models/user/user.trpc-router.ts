import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserSchema } from '@shared/validation';
import { procedure, router } from '@server/apis/trpc/trpc.instance';
import { z } from '@shared/zod';
import { sleep } from '@shared';

@Injectable()
export class UserTrpcRouter {
  constructor(private userService: UserService) {}

  routes = router({
    create: procedure.input(createUserSchema).mutation((opts) => {
      return this.userService.create(opts.input);
    }),
    update: procedure
      .input(z.object({ id: z.string(), data: createUserSchema }))
      .mutation((opts) => {
        return this.userService.update(opts.input.id, opts.input.data);
      }),
    findAll: procedure.query(async (opts) => {
      return this.userService.findAll();
    }),
    deleteOne: procedure.input(z.string()).mutation((opts) => {
      return this.userService.deleteOne(opts.input);
    }),
  });
}
