import { Global, Module } from '@nestjs/common';
import { TrpcService } from '@server/apis/trpc/trpc.service';

/**
 * trpc 实例
 */
@Global()
@Module({
  providers: [TrpcService],
  exports: [TrpcService],
})
export class TrpcModule {}
