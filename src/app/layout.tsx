import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/providers/theme-provider";
import ReduxProdiver from "@/providers/redux-provider";
import NextAuthProvider from "@/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} !bg-grid !bg-grid-light dark:!bg-grid-dark antialiased`}
      >
        <NextAuthProvider>

          <ReduxProdiver>
            <ThemeProvider
              attribute="class"
              // defaultTheme="dark"
              enableSystem
            >
              <Toaster
                toastOptions={{
                  style: {
                    background: 'black',
                  },
                  className: "bg-black border-[#ffffff1f] text-white"
                }}
              />
              {children}
            </ThemeProvider>
          </ReduxProdiver>
        </NextAuthProvider>
      </body>
    </html >
  );
}
