import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "UniBridge",
  description: "Plataforma para aproximar universidade ao mercado de trabalho.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `(() => {
  try {
    const key = "unibridge-theme";
    const stored = localStorage.getItem(key);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.theme = theme;
  } catch (_) {}
})();`;
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <head>
        <script
          // Ensures the theme is applied before the first paint.
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}