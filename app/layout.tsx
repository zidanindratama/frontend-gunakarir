import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import TanStackProvider from "@/providers/tanstack-query-provider";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GunaKarir",
  description: "Project Penulisan Ilmiah - Zidan Indratama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${montserrat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <TanStackProvider>{children}</TanStackProvider>
            <Toaster position="top-center" />
            <SmoothScroll />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
