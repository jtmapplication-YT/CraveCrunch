import type { Metadata } from "next";
import { Big_Shoulders, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
// Tall condensed menu-board type for headlines ("Night Market"). See DESIGN.md.
const bigShoulders = Big_Shoulders({ variable: "--font-display", subsets: ["latin"], weight: ["800", "900"] });

export const metadata: Metadata = {
  title: "CraveCrunch",
  description: "Find the destination of your cravings, and the hole-in-the-wall spots locals love.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${bigShoulders.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
