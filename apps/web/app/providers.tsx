"use client";

import { trpc } from "@/lib/api";
import { ClickToComponent } from "click-to-react-component";
import { ThemeProvider } from "next-themes";
import * as React from "react";

export const Providers = function Providers({ children }: { children?: any }) {
  return (
    <>
      <ClickToComponent />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TrpcProvider>{children}</TrpcProvider>
      </ThemeProvider>
    </>
  );
};

const TrpcProvider = trpc.withTRPC((props) => props.children) as any;
