// app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;

  const client = await clientPromise;
  const result = await client
    .db()
    .collection("courses")
    .deleteOne({ _id: new ObjectId(id), userId: session.user.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Course deleted" }, { status: 200 });
}
