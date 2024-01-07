"use client";

import { api } from "@web/lib/api";
import { ClickToComponent } from "click-to-react-component";
import { ThemeProvider } from "next-themes";
import * as React from "react";

export default function Providers({ children }: { children?: any }) {
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
}
