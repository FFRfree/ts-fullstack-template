import { Module } from '@nestjs/common';
import { TrpcRouterService } from './trpc.service';
import { MathModule } from '@server/features/math/math.module';
import { UserModule } from '@server/models/user/user.module';
import { AuthModule } from '@server/features/auth/auth.module';

/**
 * trpc 路由配置
 */
@Module({
  imports: [MathModule, UserModule, AuthModule],
  providers: [TrpcRouterService],
  exports: [TrpcRouterService],
})
export class TrpcRouterModule {}
