import { Inject, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserService } from './user.service';
import { createUserDto } from '@domains/dto/user';

@Injectable()
export class UserTrpcRouter {
  constructor(
    @Inject(TrpcService) private trpcService: TrpcService,
    private userService: UserService,
  ) {}

  routes = this.trpcService.router({
    create: this.trpcService.procedure.input(createUserDto).mutation((opts) => {
      return this.userService.create(opts.input);
    }),
    findAll: this.trpcService.procedure.query((opts) => {
      return this.userService.findAll();
    }),
  });
}
