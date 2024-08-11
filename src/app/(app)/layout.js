import { Lato } from "next/font/google";

export const metadata = {
  title: "LinkList Account Settings",
  description: "Created by Mike Coville",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* TODO: suppressHydrationWarning */}
      <body className={lato.className}>{children}</body>
    </html>
  );
}
