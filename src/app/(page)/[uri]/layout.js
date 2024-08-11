import { Lato } from "next/font/google";
import "../../globals.css";

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
        <main>{children}</main>
      </body>
    </html>
  );
}
