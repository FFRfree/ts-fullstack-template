import {
  INestApplication,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { TrpcService } from '@server/apis/trpc/trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { MathTrpcRouter } from '../../features/math/math.trpc-router';
import { UserTrpcRouter } from '@server/models/user/user.trpc-router';

@Injectable()
export class TrpcRouterService {
  constructor(
    private readonly trpc: TrpcService,
    @Inject(MathTrpcRouter)
    private readonly mathRouter: MathTrpcRouter,
    @Inject(UserTrpcRouter)
    private readonly userTrpcRouter: UserTrpcRouter,
  ) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : `Bilbo`}`;
      }),
    math: this.mathRouter.routes,
    resources: this.trpc.router({
      user: this.userTrpcRouter.routes,
    }),
  });

  appRouter2 = this.trpc.mergeRouters(
    this.mathRouter.routes,
    this.userTrpcRouter.routes,
  );

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouterService['appRouter'];
