"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 201) {
      router.push("/signin");
    } else {
      setErrorMsg(data.message || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign Up</h1>
      {errorMsg && <p style={styles.errorMsg}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Email:
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>
          Password:
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        <button type="submit" style={styles.button}>
          Sign Up
        </button>
      </form>
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
  },
  title: {
    textAlign: "center" as "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  errorMsg: {
    color: "red",
    textAlign: "center" as "center",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column" as "column",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    padding: "0.75rem",
    marginTop: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
  },
};
