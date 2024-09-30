// app/layout.tsx
import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Providers from "./providers";
import { Session } from "next-auth";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "InsightEd",
  description: "Your App Description",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session: Session | null = await getServerSession(authOptions);

  // Ensure session has 'expires'
  if (session) {
    session.expires = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // Example: Set expires to 2 hours from now
  }

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Navbar />
          {children}
          </Providers>
      </body>
    </html>
  );
}