// app/api/streaks/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { StudySession } from '@/models/StudySession';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const habitId = searchParams.get('habitId');

  if (!habitId) {
    return NextResponse.json({ message: 'Missing habitId' }, { status: 400 });
  }

  try {
    const sessions = await StudySession.find({
      userId: session.user.id,
      habitId,
    }).sort({ startTime: 1 });

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let previousDate: Date | null = null;
    let tempStreak = 0;

    sessions.forEach((session) => {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0); // Normalize to midnight

      if (previousDate) {
        const diffInDays = (sessionDate.getTime() - previousDate.getTime()) / (1000 * 3600 * 24);

        if (diffInDays === 1) {
          tempStreak += 1;
        } else if (diffInDays > 1) {
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }

      previousDate = sessionDate;
    });

    // For current streak, check if the last session was today or yesterday
    if (sessions.length > 0) {
      const lastSessionDate = new Date(sessions[sessions.length - 1].startTime);
      lastSessionDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diffInDays = (today.getTime() - lastSessionDate.getTime()) / (1000 * 3600 * 24);

      if (diffInDays === 0 || diffInDays === 1) {
        currentStreak = tempStreak;
      } else {
        currentStreak = 0;
      }
    }

    return NextResponse.json({ currentStreak, longestStreak });
  } catch (error) {
    return NextResponse.json({ message: 'Error calculating streaks', error }, { status: 500 });
  }
}
