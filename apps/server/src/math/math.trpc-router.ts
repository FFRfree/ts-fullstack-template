import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import { MathService } from '@server/math/math.service';

@Injectable()
export class MathTrpcRouter {
  constructor(
    @Inject(TrpcService) private trpcService: TrpcService,
    @Inject(MathService) private mathService: MathService,
  ) {}

  routes = this.trpcService.router({
    add: this.trpcService.procedure
      .input(z.array(z.number()))
      .query(({ input }) => {
        return this.mathService.add(input);
      }),
  });
}
