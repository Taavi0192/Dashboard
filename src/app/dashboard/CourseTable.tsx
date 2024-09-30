// app/dashboard/CourseTable.tsx
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

  
    const calculateProgress = (milestones: Course["sections"]["milestones"]) => {
      const totalMilestones = Object.keys(milestones).length;
      const completedMilestones = Object.values(milestones).filter(milestone => milestone.status).length;
  
  
    if (totalMilestones === 0) return 0;
    return (completedMilestones / totalMilestones) * 100;
  };

  return (
    <div>
      <h2>Courses</h2>
      <label>
        Sort By:
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof Course)}
        >
          <option value="title">Title</option>
          <option value="createdAt">Created At</option>
          {/* Add more options as needed */}
        </select>
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Asc" : "Desc"}
        </button>
      </label>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course) => {
            const progress = calculateProgress(course.sections.milestones);

            return (
              <tr key={course._id ? course._id.toString() : undefined}>
                <td>
                  <Link href={`/courses/${course._id?.toString()}`}>
                    {course.title}
                  </Link>
                </td>
                <td>{course.description}</td>
                <td>{progress}%</td>
                <td>
                  {/* Add edit functionality if needed */}
                  <button onClick={() => {
                    if (window.confirm('Are you sure you want to delete course?')) {
                      handleDelete(course._id!.toString() || '');
                    }
                  }}>
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
