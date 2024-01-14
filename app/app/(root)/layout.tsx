import { NavBar } from "@/components/nav-bar";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../../providers";
import { Toaster } from "@/components/ui/sonner";

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
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <nav>
            <NavBar />
          </nav>
          <div className="m-4">{children}</div>
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
