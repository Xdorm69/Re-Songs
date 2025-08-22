import type { Metadata } from "next";
import { ABeeZee, Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Providers/Theme-Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryClientProviderApp from "@/components/Providers/QueryClient-Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const AbeeZee = ABeeZee({
  variable: "--font-abeeze",
  subsets: ["latin"],
  weight: "400",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Re-Songs",
  description:
    "Re-Songs is an app that allows you to search for songs by their lyrics, artist, or category, and displays the results in a table.",
  icons: {
    icon: "/spotify.png", // You'll need to add this file to your public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${AbeeZee.variable} ${roboto.variable} font-sans`}
      >
        <div className="fixed inset-0 -z-10 bg-animated-gradient" />
        <div className="relative min-h-screen">
          <QueryClientProviderApp>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
              <Footer />
            </ThemeProvider>
          </QueryClientProviderApp>
        </div>
      </body>
    </html>
  );
}
