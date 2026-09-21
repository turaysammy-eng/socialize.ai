import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "SOCIALIZE — Developer Collaboration Platform",
  description: "Connect, build open source projects, join developer communities, share discussions, and collaborate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
