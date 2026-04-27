import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Yeseva_One } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const display = Yeseva_One({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const accent = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-accent",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sarika Shirolkar — AI Engineer & Builder",
  description:
    "AI engineer building agentic systems, voice agents, and shipped products. IEEE-published. Hackathon winner. Bengaluru.",
  openGraph: {
    title: "Sarika Shirolkar",
    description: "AI engineer & builder. Linkyro, voice agents, IEEE-published.",
    url: "https://sarika.aiworkflowautomate.com",
    siteName: "Sarika Shirolkar",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${accent.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
