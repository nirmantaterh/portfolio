import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundLayers from "./components/BackgroundLayers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Nirman Taterh — AI/ML Engineer",
  description: "AI-native builder with 3+ years shipping production ML systems across NLP, RAG, and recommendation. MS Data Science @ NYU.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col relative">
        <BackgroundLayers />
        <div className="relative z-10 flex flex-col min-h-full w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
