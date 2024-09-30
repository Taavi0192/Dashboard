// app/habits/[habitId]/page.tsx
"use client"

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import StudyHeatmap from '@/app/components/StudyHeatmap';
import StreakInfo from '@/app/components/StreakInfo';
import StudyChart from '@/app/components/StudyChart';
import LogStudySession from '@/app/components/LogStudySession';
import { useParams } from 'next/navigation';

interface Habit {
  habitId: string;
  name: string;
  description?: string;
  targetFrequency: 'Daily' | 'Weekly';
  creationDate: string;
}
// app/habits/[habitId]/page.tsx
// ... existing imports ...

export default function HabitDetailPage() {
  const params = useParams();
  const habitId = params.habitId;
  const [habit, setHabit] = useState<Habit | null>(null);
  const [error, setError] = useState('');

  const fetchHabit = async () => {
    if (!habitId) return;

    const response = await fetch(`/api/habits/${habitId}`);
    if (response.ok) {
      const data = await response.json();
      setHabit(data);
    } else {
      setError('Error fetching habit details');
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [habitId]);

  if (!habit) {
    return <p>Loading habit details...</p>;
  }

  return (
    <div>
      <h1>{habit.name}</h1>
      {habit.description && <p>{habit.description}</p>}
      <LogStudySession habitId={habit._id} onSessionLogged={fetchHabit} />
      <h2>Study Heatmap</h2>
      <StudyHeatmap habitId={habit._id} period="month" />
      <h2>Streak Information</h2>
      <StreakInfo habitId={habit._id} />
      <h2>Study Patterns</h2>
      <StudyChart habitId={habit._id} />
    </div>
  );
}
