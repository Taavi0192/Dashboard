// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getCoursesByUser } from "@/lib/mongoHelpers";
import Link from "next/link";
import CourseTable from "./CourseTable";
import { Session } from "next-auth";

const session: Session | null = await getServerSession(authOptions);

export default async function DashboardPage() {

  if (!session || !session.user || !session.user.id) {
    redirect("/signin");
  }

  const courses = await getCoursesByUser(session.user.id);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Courses: {courses.length}</p>
      <Link href="/courses/add">Add New Course</Link>
      <CourseTable courses={courses} />
    </div>
  );
}
