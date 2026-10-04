import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Shrikhand } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
// Retro diner display face for the logo, hero headline and restaurant names (24px and up). See DESIGN.md.
const shrikhand = Shrikhand({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "CraveCrunch",
  description: "Find the destination of your cravings, and the hole-in-the-wall spots locals love.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${shrikhand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
