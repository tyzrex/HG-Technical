import type { Metadata } from "next";
import { Outfit, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/global/footer";
import Header from "@/components/global/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-client-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Ecommerce Task",
  description: "A mock ecommerce website for a task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Toaster richColors />
        <QueryProvider>
          <ReduxProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
