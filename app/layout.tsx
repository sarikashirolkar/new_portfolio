import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sarika S Shirolkar — AI Engineer & Builder",
  description:
    "AI engineer building agentic systems, voice agents, and shipped products. IEEE-published. Hackathon winner. Bengaluru.",
  openGraph: {
    title: "Sarika S Shirolkar",
    description: "AI engineer & builder. Linkyro, voice agents, IEEE-published.",
    url: "https://sarika.aiworkflowautomate.com",
    siteName: "Sarika S Shirolkar",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
