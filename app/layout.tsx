import type { Metadata } from "next";
import {
  NIMBUS_APPLE_TOUCH_ICON,
  NIMBUS_FAVICON_32,
  NIMBUS_FAVICON_192,
  NIMBUS_MS_TILE_IMAGE,
} from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nimbus Telecom | Cobertura movil",
  description:
    "Landing MVP para estudiar problemas de cobertura movil y contratar opciones moviles con Nimbus Telecom.",
  icons: {
    icon: [
      { url: NIMBUS_FAVICON_32, sizes: "32x32", type: "image/png" },
      { url: NIMBUS_FAVICON_192, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: NIMBUS_APPLE_TOUCH_ICON, sizes: "180x180", type: "image/png" }],
  },
  other: {
    "msapplication-TileImage": NIMBUS_MS_TILE_IMAGE,
  },
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
