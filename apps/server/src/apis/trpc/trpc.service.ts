import {
  INestApplication,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { MathTrpcRouter } from '../../features/math/math.trpc-router';
import { UserTrpcRouter } from '@server/models/user/user.trpc-router';
import { procedure, router } from './trpc.instance';

@Injectable()
export class TrpcRouterService {
  constructor(
    @Inject(MathTrpcRouter)
    private readonly mathRouter: MathTrpcRouter,
    @Inject(UserTrpcRouter)
    private readonly userTrpcRouter: UserTrpcRouter,
  ) {}

  appRouter = router({
    hello: procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : `Bilbo`}`;
      }),
    math: this.mathRouter.routes,
    resources: router({
      user: this.userTrpcRouter.routes,
    }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouterService['appRouter'];
