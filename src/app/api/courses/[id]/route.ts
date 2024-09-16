// app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { Session } from "next-auth";

const session: Session | null = await getServerSession(authOptions);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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
