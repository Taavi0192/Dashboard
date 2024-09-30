// app/api/habits/[habitId]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Habit } from '@/models/Habit';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Adjust the path as needed
import mongoose from 'mongoose';

interface Params {
  params: {
    habitId: string;
  };
}

// GET handler to fetch habit details
export async function GET(req: Request, { params }: Params) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { habitId } = params;

  try {
    const habit = await Habit.findOne({
      userId: session.user.id,
      _id: new mongoose.Types.ObjectId(habitId),
    });
    if (!habit) {
      return NextResponse.json({ message: 'Habit not found' }, { status: 404 });
    }
    return NextResponse.json(habit);
  } catch (error) {
    console.error('Error fetching habit:', error);
    return NextResponse.json({ message: 'Error fetching habit', error }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }: Params) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { habitId } = params;

  try {
    const result = await Habit.deleteOne({
      userId: session.user.id,
      _id: new mongoose.Types.ObjectId(habitId),
    });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Habit not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Habit deleted' });
  } catch (error) {
    console.error('Error deleting habit:', error);
    return NextResponse.json({ message: 'Error deleting habit', error }, { status: 500 });
  }
}