// app/error/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An unknown error occurred.";

  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password.";
  }

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
