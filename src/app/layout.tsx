import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Vựa Mít Khoa - Thu Mua Mít Tận Nơi | Giá Cao",
  description: "Vựa Mít Khoa chuyên thu mua mít các loại với giá cao. Thu mua tận nơi, thanh toán ngay, không giới hạn số lượng. Liên hệ hotline 0123.456.789",
  keywords: "thu mua mít, vựa mít, mít thái, mít ruột đỏ, thu mua mít giá cao",
  openGraph: {
    title: "Vựa Mít Khoa - Thu Mua Mít Tận Nơi",
    description: "Thu mua mít các loại với giá cao",
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
