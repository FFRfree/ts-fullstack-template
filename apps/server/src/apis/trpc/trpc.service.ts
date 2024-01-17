import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { TRPC_ROUTER } from '@server/common/constant/trpc.constant';
import { initTRPC } from '@trpc/server';
import { trpc } from './trpc.instance';

@Injectable()
export class TrpcService implements OnModuleInit {
  private logger: Logger;
  appRouter: ReturnType<typeof this.createAppRouter>;

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {
    this.logger = new Logger('tRPCService');
  }

  onModuleInit() {
    this.createAppRouter();
  }

  private createAppRouter() {
    const p = this.discovery.getProviders();
    const routers = p
      .filter((provider) => {
        try {
          return this.reflector.get(TRPC_ROUTER, provider.metatype);
        } catch {
          return false;
        }
      })
      .map(({ instance }) => instance.router)
      .filter((router) => {
        if (!router) {
          this.logger.warn('missing router.');
        }

        return !!router;
      });

    const appRouter = trpc.mergeRouters(...(routers as any as Routers));

    this.appRouter = appRouter;
    return appRouter;
  }
}
