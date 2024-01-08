"use client";

import { api } from "@/lib/api";
import { ClickToComponent } from "click-to-react-component";
import { ThemeProvider } from "next-themes";
import * as React from "react";

const P = api.withTRPC(function Providers({ children }: { children?: any }) {
  return (
    <>
      <ClickToComponent />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
});

export default P;
