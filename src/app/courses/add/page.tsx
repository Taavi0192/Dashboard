// app/courses/add/page.tsx
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
    } else {
      const data = await res.json();
      setErrorMsg(data.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <h1>Add Course</h1>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <br />
        <label>
          Total Units:
          <input
            type="number"
            value={totalUnits}
            onChange={(e) => setTotalUnits(Number(e.target.value))}
            min={1}
            required
          />
        </label>
        <br />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
}
