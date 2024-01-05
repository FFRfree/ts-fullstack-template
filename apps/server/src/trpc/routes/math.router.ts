import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import { MathService } from '@server/math/math.service';

@Injectable()
export class MathRouter {
  // @Inject(forwardRef(() => TrpcService)) trpcService: TrpcService;
  @Inject(TrpcService) trpcService: TrpcService;

  @Inject(MathService) mathService: MathService;

  get routes() {
    return this.trpcService.router({
      add: this.trpcService.procedure
        .input(z.array(z.number()))
        .query(({ input }) => {
          return this.mathService.add(input);
        }),
    });
  }
}
