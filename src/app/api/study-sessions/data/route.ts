// app/api/study-sessions/data/route.ts
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
  const period = searchParams.get('period');
  const habitId = searchParams.get('habitId');

  if (!period || !habitId) {
    return NextResponse.json({ message: 'Missing period or habitId' }, { status: 400 });
  }

  try {
    let startDate = new Date();
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 6);
    } else if (period === 'month') {
      startDate.setDate(startDate.getDate() - 29);
    } else {
      return NextResponse.json({ message: 'Invalid period' }, { status: 400 });
    }

    const sessions = await StudySession.find({
      userId: session.user.id,
      habitId,
      startTime: { $gte: startDate },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching study data', error }, { status: 500 });
  }
}
