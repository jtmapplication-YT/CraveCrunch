import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
// Retro diner display face for the logo, hero headline and restaurant names (24px and up). See DESIGN.md.
// Headline face. Swap it here (and in apps/mobile/src/constants/fonts.ts) to change every display heading.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: "800" });

export const metadata: Metadata = {
  title: "CraveCrunch",
  description: "Find the destination of your cravings, and the hole-in-the-wall spots locals love.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
