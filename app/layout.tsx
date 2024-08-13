import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {/* <main className="min-h-screen flex flex-col items-center"> */}
        {children}
        {/* </main> */}
      </body>
    </html>
  );
}
