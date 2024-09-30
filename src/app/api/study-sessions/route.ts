// app/api/study-sessions/index.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { StudySession } from '@../../models/StudySession';
import { getServerSession } from 'next-auth/next';
// import { getSession } from 'next-auth/react';
import mongoose from 'mongoose';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { habitId, startTime, endTime } = await req.json();

  if (!habitId || !startTime || !endTime) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const duration =
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000; // Duration in minutes

      const studySession = await StudySession.create({
        userId: session.user.id,
        habitId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration,
    });

    return NextResponse.json(studySession, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error logging study session', error }, { status: 400 });
  }
}