import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { z } from 'zod';
import { MathService } from '@server/features/math/math.service';
import { procedure, router } from '@server/apis/trpc/trpc.instance';

@Injectable()
export class MathTrpcRouter {
  constructor(private mathService: MathService) {}

  routes = router({
    add: procedure.input(z.array(z.number())).query(({ input }) => {
      return this.mathService.add(input);
    }),
  });
}
