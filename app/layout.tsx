import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Shadcn code registry",
  description: "use the`shadcn` CLI to run your own code registry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
