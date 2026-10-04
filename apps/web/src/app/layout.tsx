import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraveCrunch",
  description: "Find the destination of your cravings, and the hole-in-the-wall spots locals love.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
