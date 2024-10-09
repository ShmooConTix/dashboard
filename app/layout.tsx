import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "ShmooCon Ticket Bot '25",
  description: "IT'S TICKET TIME.",
};

const mainFont = localFont({
  src: "./fonts/GeistVF.woff",
  weight: "400 700",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased dark flex min-h-screen w-full flex-col mx-auto ${mainFont.className}`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
