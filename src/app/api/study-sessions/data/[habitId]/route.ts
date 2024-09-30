// app/api/study-sessions/data/[habitId]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { StudySession } from '@/models/StudySession';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Params {
  params: {
    habitId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  await dbConnect();

  // Authenticate the user
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { habitId } = params;

  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period');

  if (!period) {
    return NextResponse.json({ message: 'Missing period parameter' }, { status: 400 });
  }

  try {
    // Determine the start date based on the period
    let startDate = new Date();
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 6);
    } else if (period === 'month') {
      startDate.setDate(startDate.getDate() - 29);
    } else {
      return NextResponse.json({ message: 'Invalid period' }, { status: 400 });
    }

    // Fetch study sessions from the database
    const sessions = await StudySession.find({
      userId: session.user.id,
      habitId,
      startTime: { $gte: startDate },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching study data:', error);
    return NextResponse.json({ message: 'Error fetching study data', error }, { status: 500 });
  }
}
