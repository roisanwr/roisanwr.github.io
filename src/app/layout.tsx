import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rois Anwar — Software Engineer",
  description:
    "Software engineer building exceptional, accessible digital experiences. Clean code. Intentional design.",
  openGraph: {
    title: "Rois Anwar — Software Engineer",
    description:
      "Software engineer building exceptional digital experiences.",
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
      className={`${bebasNeue.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        {/* Inline script runs before React hydration — prevents flash of light mode */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');if(s!=='light')document.documentElement.classList.add('dark');}())`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
