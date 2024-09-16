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

export async function createCourse(courseData: Partial<Course>): Promise<Course> {
  const client = await clientPromise;

  // Exclude _id from the data to be inserted
  const { _id, ...data } = courseData;

  const result = await client.db().collection<Omit<Course, "_id">>("courses").insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const course = await client
    .db()
    .collection<Course>("courses")
    .findOne({ _id: result.insertedId });

  return course!;
}

// Add more helper functions for updating and deleting courses as needed.
