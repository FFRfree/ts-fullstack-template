import { Module } from '@nestjs/common';
import { TrpcRouterService } from './trpc-router.service';
import { MathModule } from '@server/math/math.module';
import { TrpcModule } from '@server/trpc/trpc.module';

/**
 * trpc 路由配置
 */
@Module({
  imports: [TrpcModule, MathModule],
  providers: [TrpcRouterService],
  exports: [TrpcRouterService],
})
export class TrpcRouterModule {}
