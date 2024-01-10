import { Module } from '@nestjs/common';
import { MathService } from './math.service';
import { TrpcModule } from '@server/apis/trpc/trpc.module';
import { MathTrpcRouter } from './math.trpc-router';

@Module({
  imports: [TrpcModule],
  providers: [MathService, MathTrpcRouter],
  exports: [MathService, MathTrpcRouter],
})
export class MathModule {}
