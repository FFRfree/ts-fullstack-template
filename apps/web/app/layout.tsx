import { Toaster } from "@/components/ui/toaster";
// import "../antd.mine.css";
import "./antd.css";
import "./globals.css";
import "rc-picker/assets/index.css";

import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ffr dev stack",
  description: "using tech including trpc, react, nestjs, shadcn/ui",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <>
          <Toaster />
        </>
      </body>
    </html>
  );
}
