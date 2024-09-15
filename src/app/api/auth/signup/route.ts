// app/api/auth/signup/route.ts
import { hash } from "bcrypt";
import clientPromise from "../../../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCollection = client.db().collection("users");

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 422 });
    }

    const hashedPassword = await hash(password, 12);

    await usersCollection.insertOne({
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created." }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
