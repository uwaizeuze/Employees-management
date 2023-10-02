import "./globals.css";
import { Inter, Open_Sans, Roboto_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata = {
  title: "Employee Management",
  description: "How to manage your employee Detail",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${robotoMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
