import { Module } from '@nestjs/common';
import { MathService } from './math.service';
import { MathTrpcRouter } from './math.trpc-router';

@Module({
  imports: [],
  providers: [
    MathService,
    MathTrpcRouter,
    {
      provide: 'hehe',
      useValue: {
        shit: 'dog shit',
      },
    },
  ],
  exports: [MathTrpcRouter],
})
export class MathModule {}
