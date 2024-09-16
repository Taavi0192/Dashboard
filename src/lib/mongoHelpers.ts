// lib/mongodbHelpers.ts
import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
import { Course } from "@/types/course";

export async function getCoursesByUser(userId: string): Promise<Course[]> {
  const client = await clientPromise;

  const courses = await client
    .db()
    .collection<Course>("courses")
    .find({ userId })
    .toArray();

  return courses;
}

export async function createCourse(courseData: Omit<Course, "_id">): Promise<Course> {
  const client = await clientPromise;

  const result = await client
    .db()
    .collection<Omit<Course, "_id">>("courses")
    .insertOne({
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  const course = await client
    .db()
    .collection<Course>("courses")
    .findOne({ _id: result.insertedId });

  return course!;
}

export async function updateCourseProgress(
  courseId: string,
  userId: string,
  unitsCovered: number
): Promise<void> {
  const client = await clientPromise;

  await client
    .db()
    .collection("courses")
    .updateOne(
      { _id: new ObjectId(courseId), userId },
      { $set: { unitsCovered, updatedAt: new Date() } }
    );
}

export async function deleteCourse(courseId: string, userId: string): Promise<void> {
  const client = await clientPromise;

  await client
    .db()
    .collection("courses")
    .deleteOne({ _id: new ObjectId(courseId), userId });
}

// Add more helper functions for updating and deleting courses as needed.
