// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCoursesByUser } from "@/lib/mongoHelpers";
import Link from "next/link";
import { Course } from "@/types/course";
import { redirect } from "next/navigation";
import CourseTable from "../dashboard/CourseTable";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
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
