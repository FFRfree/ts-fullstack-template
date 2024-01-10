import { Module } from '@nestjs/common';
import { MathService } from './math.service';
import { MathTrpcRouter } from './math.trpc-router';

@Module({
  imports: [],
  providers: [MathService],
  exports: [MathTrpcRouter],
})
export class MathModule {}
