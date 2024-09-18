// app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { Session } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const course = await client
      .db()
      .collection("courses")
      .findOne({ _id: new ObjectId(id), userId: session.user.id });

    if (!course) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching course", error: error.message },
        { status: 500 }
      );
    } else {
      // Handle cases where error is not an instance of Error
      return NextResponse.json(
        { message: "An unknown error occurred." },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const userId = session.user.id;

  const client = await clientPromise;
  const result = await client
    .db()
    .collection("courses")
    .deleteOne({ _id: new ObjectId(id), userId });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Course deleted" }, { status: 200 });
}
