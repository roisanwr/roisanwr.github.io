import type { Metadata } from "next";
import { Syne, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rois Anwar — Software Engineer",
  description:
    "Software engineer crafting exceptional digital experiences. Building for the web with precision and intention.",
  openGraph: {
    title: "Rois Anwar — Software Engineer",
    description: "Software engineer crafting exceptional digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        {/* Dark mode always — no toggle in v3 */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark')`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
