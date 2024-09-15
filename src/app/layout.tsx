// src/app/layout.tsx
import { ReactNode } from "react";
import Providers from "./providers";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
