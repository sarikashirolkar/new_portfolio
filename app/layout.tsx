import type { Metadata } from "next";
import { Open_Sans, Ubuntu } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const heading = Ubuntu({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-display",
});

const body = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

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
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
