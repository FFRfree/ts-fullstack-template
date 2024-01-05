import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';

/**
 * trpc 实例
 */
@Module({
  providers: [TrpcService],
  exports: [TrpcService],
})
export class TrpcModule {}
