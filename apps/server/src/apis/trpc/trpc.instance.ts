import { initTRPC } from '@trpc/server';

export const trpc = initTRPC.create();

export const procedure = trpc.procedure;

export const router = trpc.router;
