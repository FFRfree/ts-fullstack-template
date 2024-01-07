// import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "@server/trpc-router/trpc-router.service";
import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
  loggerLink,
} from "@trpc/react-query";

export const trpc = createTRPCProxyClient<AppRouter>({
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
