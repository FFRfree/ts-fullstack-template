import {
  BuildProcedure,
  inferRouterInputs,
  inferRouterOutputs,
  initTRPC,
} from '@trpc/server';

export const trpc = initTRPC.create();

export type tRpcRouterType = (typeof trpc)['router'];
export type tRpcProcedure = (typeof trpc)['procedure'];
export type tRpc$Config = typeof trpc._config;

// export type JJ =
// export type AppRouter = tRPCService['appRouter']
// export type RouterInputs = inferRouterInputs<AppRouter>
// export type RouterOutputs = inferRouterOutputs<AppRouter>
