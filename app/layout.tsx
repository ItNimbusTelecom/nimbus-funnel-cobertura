import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nimbus Telecom | Cobertura movil",
  description:
    "Landing MVP para estudiar problemas de cobertura movil y contratar opciones moviles con Nimbus Telecom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
