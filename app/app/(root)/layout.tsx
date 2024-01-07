import { NavBar } from "@/components/nav-bar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal",
  description: "Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav>
            <NavBar />
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
