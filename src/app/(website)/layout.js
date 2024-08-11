import { Lato } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

export const metadata = {
  title: "LinkList App",
  description: "Created by Mike Coville",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>
          <Header />
          <div className="p-6 max-w-4xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
