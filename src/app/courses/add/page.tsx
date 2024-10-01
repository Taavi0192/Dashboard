"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalUnits, setTotalUnits] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, totalUnits }),
    });

    if (res.status === 201) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setErrorMsg(data.message || "Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Course</h1>
      {errorMsg && <p style={styles.errorMsg}>{errorMsg}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Title:
          <input
            type="text"
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>
          Description:
          <textarea
            style={{ ...styles.input, height: "100px", resize: "vertical" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <label style={styles.label}>
          Total Units:
          <input
            type="number"
            style={styles.input}
            value={totalUnits}
            onChange={(e) => setTotalUnits(Number(e.target.value))}
            min={1}
            required
          />
        </label>
        <button type="submit" style={styles.button}>
          Add Course
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "1.5rem",
    color: "#333",
  },
  errorMsg: {
    color: "red",
    textAlign: "center" as const,
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column" as const,
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
    marginTop: "1rem",
  },
};
