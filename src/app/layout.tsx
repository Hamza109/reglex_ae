import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// src/app/layout.tsx
export const metadata = {
  title: {
    default: 'RegLex — Advisory & Compliance',
    template: '%s | RegLex',
  },
  description: 'Boutique regulatory and compliance advisory.',
  icons: {
    icon: '/favicon.ico',                 // public/favicon.ico
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',       // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
          integrity='sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
         <link rel="preload" as="image" href="/hero.webp" imageSrcSet="/hero.webp" />
         <link rel="preload" as="image" href="/WHITE_LOGO.png" imageSrcSet="/WHITE_LOGO.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
