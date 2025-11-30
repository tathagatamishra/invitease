// app/layout.js
import { Alan_Sans } from "next/font/google";
import "./globals.css";

const alanSans = Alan_Sans({
  variable: "--font-alan-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "invitease",
  description: "Create, customize, and share invitations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${alanSans.variable} antialiased sm:py-16 sm:px-16 py-6 pb-12 px-6`}>{children}</body>
    </html>
  );
}
