import { Toaster } from "@web/components/ui/toaster";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@web/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ffr dev stack",
  description: "using stack including trpc, react, nestjs, shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <>
          <Toaster />
        </>
      </body>
    </html>
  );
}
