import { Module } from '@nestjs/common';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { TrpcService } from '@server/trpc/trpc.service';
import { MathRouter } from './routes/math.router';
import { MathModule } from '@server/math/math.module';

@Module({
  imports: [MathModule],
  providers: [TrpcService, TrpcRouter, MathRouter],
})
export class TrpcModule {}
