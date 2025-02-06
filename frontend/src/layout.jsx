import React from "react";
import "./styles"; // Ensure this path is correct
import { Inter } from "@next/font/google"; // Import Inter font

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Website",
  description: "A modern school website built with React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}