// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createCourse } from "@/lib/mongoHelpers";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, totalUnits } = await req.json();

  if (!title || !description || !totalUnits) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const course = await createCourse({
    userId: session.user.id,
    title,
    description,
    totalUnits,
    unitsCovered: 0,
    sections: {
      lessonPlan: {}, // Initialize as needed
      milestones: {},
      assessments: {},
      chatbot: {},
    },
  });

  return NextResponse.json(course, { status: 201 });
}
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const courses = await getCoursesByUser(session.user.id);
  return NextResponse.json(courses, { status: 200 });
}
