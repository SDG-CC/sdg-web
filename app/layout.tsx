import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SDG Campus CLub",
  description: "Sustainable Development Goals Campus CLub",
  icons:{
    icon: '/sdglogo.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-100 dark:bg-zinc-900 antialiased`}
      >
        <div><Navbar/></div>
        <div className="w-full">{children}</div>
        <div className="w-full">
           <Footer/>
        </div>
      </body>
    </html>
  );
}
