import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

export const metadata: Metadata = {
  title: "Clario",
  description:
    "AI tool that instantly transforms raw meeting transcripts into sharp, structured summaries. No login. No fluff. Free forever.",
  icons: {
    icon: "/fevicon.png",
  },
  openGraph: {
    title: "Clario: Ruthless Transcript Summaries",
    description:
      "AI tool that instantly transforms raw meeting transcripts into sharp, structured summaries. No login. No fluff. Free forever.",
    type: "website",
    url: "https://clario-summarizer.vercel.app/", // Replace with your actual domain
    images: [
      {
        url: "https://placehold.co/1200x630/000000/FFFFFF/png?text=Clario", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Clario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clario: Ruthless Transcript Summaries",
    description:
      "AI tool that instantly transforms raw meeting transcripts into sharp, structured summaries. No login. No fluff. Free forever.",
    images: ["https://placehold.co/1200x630/000000/FFFFFF/png?text=Clario"], // Replace with your actual Twitter image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sansation:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  );
}
