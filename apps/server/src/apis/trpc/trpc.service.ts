import {
  INestApplication,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { z } from '@shared/zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { AuthTrpcRouter, MathTrpcRouter, UserTrpcRouter } from './routers';
import { procedure, router } from './trpc.instance';

@Injectable()
export class TrpcRouterService {
  constructor(
    @Inject(MathTrpcRouter)
    private readonly mathRouter: MathTrpcRouter,
    @Inject(UserTrpcRouter)
    private readonly userTrpcRouter: UserTrpcRouter,
    @Inject(AuthTrpcRouter)
    private readonly authTrpcRouter: AuthTrpcRouter,
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
    auth: this.authTrpcRouter.routes,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouterService['appRouter'];
