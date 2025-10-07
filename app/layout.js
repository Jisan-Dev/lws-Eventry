import Navbar from "@/components/navbar";
import AuthProvider from "@/providers/AuthProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Eventry",
  description: "A next level event booking & management system built with Next.js & Tailwind CSS",
  keywords:
    "event, events, booking, management, system, nextjs, tailwindcss, react, javascript, web development",
  authors: [{ name: "Jisan", url: "https://istiakjisan.vercel.app/" }],
  creator: "Jisan",
  publisher: "Jisan",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter`}>
        <AuthProvider>
          <Navbar />
          <main className="py-4 sm:py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
