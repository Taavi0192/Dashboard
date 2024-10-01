import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getCoursesByUser } from "@/lib/mongoHelpers";
import Link from "next/link";
import CourseTable from "./CourseTable";
import { Session } from "next-auth";

export default async function DashboardPage() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/signin");
  }

  const courses = await getCoursesByUser(session.user.id);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.subtitle}>Total Courses: {courses.length}</p>
      {courses.length > 0 ? (
        <CourseTable courses={courses} />
      ) : (
        <p style={styles.noCoursesMessage}>
          You have no courses. Start by creating one!
        </p>
      )}
      <Link href="/courses/add">
        <button style={styles.addButton}>Add New Course</button>
      </Link>
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
    textAlign: "center" as const,
  },
  title: {
    marginBottom: "1rem",
    color: "#333",
  },
  subtitle: {
    marginBottom: "2rem",
    color: "#555",
    fontSize: "1.2rem",
  },
  noCoursesMessage: {
    marginBottom: "2rem",
    color: "#555",
    fontSize: "1rem",
  },
  addButton: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    cursor: "pointer",
    marginTop: "1rem",
  },
};
