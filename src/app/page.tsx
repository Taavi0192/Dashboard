// src/app/page.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Next.js App</h1>
      {session ? (
        <>
          <p>You are signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <Link href="/signin">Sign In</Link> | <Link href="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
