import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
