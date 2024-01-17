import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { TrpcService } from '@server/apis/trpc/trpc.service';

/**
 * trpc 实例
 */
@Global()
@Module({
  providers: [TrpcService],
  exports: [TrpcService],
  imports: [DiscoveryModule],
})
export class TrpcModule {}
