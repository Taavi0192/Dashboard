"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CourseTableProps {
  courses: Course[];
}

export default function CourseTable({ courses }: CourseTableProps) {
  const [sortBy, setSortBy] = useState<keyof Course>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const router = useRouter();

  const sortedCourses = [...courses].sort((a, b) => {
    if (a[sortBy]! < b[sortBy]!) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy]! > b[sortBy]!) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.refresh();
    } else {
      alert("Failed to delete course");
    }
  };

  const calculateProgress = (
    milestones: Course["sections"]["milestones"]
  ) => {
    const totalMilestones = Object.keys(milestones).length;
    const completedMilestones = Object.values(milestones).filter(
      (milestone) => milestone.status
    ).length;

    if (totalMilestones === 0) return 0;
    return (completedMilestones / totalMilestones) * 100;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Courses</h2>
      <div style={styles.sortContainer}>
        <label style={styles.label}>
          Sort By:
          <select
            style={styles.select}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as keyof Course)}
          >
            <option value="title">Title</option>
            <option value="createdAt">Created At</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <button
          style={styles.sortButton}
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Title</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Progress</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course) => {
            const progress = calculateProgress(course.sections.milestones);

            return (
              <tr key={course._id ? course._id.toString() : undefined}>
                <td style={styles.tableCell}>
                  <Link href={`/courses/${course._id?.toString()}`}>
                    <span style={styles.link}>{course.title}</span>
                  </Link>
                </td>
                <td style={styles.tableCell}>{course.description}</td>
                <td style={styles.tableCell}>{progress.toFixed(0)}%</td>
                <td style={styles.tableCell}>
                  {/* Add edit functionality if needed */}
                  <button
                    style={styles.deleteButton}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this course?"
                        )
                      ) {
                        handleDelete(course._id!.toString() || "");
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
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
  sortContainer: {
    display: "flex",
    justifyContent: "flex-end" as const,
    alignItems: "center" as const,
    marginBottom: "1rem",
    gap: "1rem",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
  },
  select: {
    padding: "0.5rem",
    marginLeft: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  sortButton: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #0070f3",
    backgroundColor: "#fff",
    color: "#0070f3",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
    textAlign: "left" as const,
    padding: "0.75rem",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "0.75rem",
  },
  link: {
    color: "#0070f3",
    textDecoration: "none",
  },
  deleteButton: {
    padding: "0.5rem 1rem",
    fontSize: "0.9rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    cursor: "pointer",
  },
};
