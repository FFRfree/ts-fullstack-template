import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TrpcService } from '@server/apis/trpc/trpc.service';
import { z } from 'zod';
import { MathService } from '@server/features/math/math.service';
import { tRpcProcedure, trpc } from '@server/apis/trpc/trpc.instance';
import { BuildProcedure } from '@trpc/server';
import {
  Procedure,
  TRPCRouter,
  validate,
} from '@server/common/decorators/trpc.decorators';

@TRPCRouter('a.b.c')
@Injectable()
export class MathTrpc {
  constructor(
    @Inject(TrpcService) private trpcService: TrpcService,
    @Inject(MathService) private mathService: MathService,
  ) {}

  @Procedure()
  add = trpc.procedure.input(z.array(z.number())).query(({ input }) => {
    return this.mathService.add(input);
  });

  minus = trpc.procedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .query(({ input }) => input.a - input.b);
}

type ExtractTrpcProcedure<MyClass> = {
  [K in keyof MyClass as MyClass[K] extends BuildProcedure<any, any, any>
    ? K
    : never]: MyClass[K];
};

//@ts-expect-error
const instance = new MathTrpc({}, {});

type mathRouter = ExtractTrpcProcedure<MathTrpc>;
