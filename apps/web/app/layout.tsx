import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ffr dev stack",
  description: "using stack including trpc, react, nestjs, shadcn/ui",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/** @ts-expect-error idk why type went wrong after wrapping with api.withTRPC */}
        <Providers>{children}</Providers>
        <>
          <Toaster />
        </>
      </body>
    </html>
  );
}
