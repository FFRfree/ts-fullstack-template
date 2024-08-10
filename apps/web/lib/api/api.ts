import type { AppRouter } from "@shared/app-router";
import { createTRPCProxyClient, loggerLink, httpBatchLink } from "@trpc/client";

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
    }),
  ],
});
