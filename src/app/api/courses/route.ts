// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createCourse } from "@/lib/mongoHelpers";
import type { Session } from "next-auth";
import { getCoursesByUser } from "@/lib/mongoHelpers";

export async function POST(req: Request) {

  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
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
      lessonPlan: {},
      milestones: {},
      assessments: {},
      chatbot: {},
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json(course, { status: 201 });
}

export async function GET() {

  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const courses = await getCoursesByUser(session.user.id);
  return NextResponse.json(courses, { status: 200 });
}
