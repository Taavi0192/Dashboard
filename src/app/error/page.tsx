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
    <div style={styles.container}>
      <h1 style={styles.title}>Error</h1>
      <p style={styles.errorMessage}>{errorMessage}</p>
      <button
        style={styles.button}
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  title: {
    marginBottom: "1.5rem",
    color: "#ff4d4f",
    fontSize: "2rem",
  },
  errorMessage: {
    color: "#555",
    fontSize: "1.2rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    marginTop: "1.5rem",
  },
};
