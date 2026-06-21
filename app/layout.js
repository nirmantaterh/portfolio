import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundLayers from "./components/BackgroundLayers";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const THEME_VERSION = '4';

export const metadata = {
  title: "Nirman Taterh — AI/ML Engineer",
  description: "AI-native builder with 3+ years shipping production ML systems across NLP, RAG, and recommendation. MS Data Science @ NYU.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col relative" suppressHydrationWarning>
        {/* Inline script prevents theme flash before hydration */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var version='${THEME_VERSION}';var storedVersion=localStorage.getItem('theme-version');var savedTheme=localStorage.getItem('theme');var theme=(storedVersion===version&&savedTheme)?savedTheme:'paper';var c=localStorage.getItem('colorblind')==='true';localStorage.setItem('theme-version',version);localStorage.setItem('theme',theme);document.documentElement.setAttribute('data-theme',theme);document.documentElement.setAttribute('data-colorblind',c?'true':'false');}catch(e){}})();` }} />
        <BackgroundLayers />
        <div className="relative z-10 flex flex-col min-h-full w-full">
          {children}
        </div>
      </body>
    </html>
  );
}

