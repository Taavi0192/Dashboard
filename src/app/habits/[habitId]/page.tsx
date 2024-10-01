"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StudyHeatmap from '@/app/components/StudyHeatmap';
import StreakInfo from '@/app/components/StreakInfo';
import StudyChart from '@/app/components/StudyChart';
import LogStudySession from '@/app/components/LogStudySession';

interface Habit {
  _id: string;
  name: string;
  description?: string;
  targetFrequency: 'Daily' | 'Weekly';
  creationDate: string;
}

export default function HabitDetailPage() {
  const params = useParams();
  const habitId = params.habitId as string;
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
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading habit details...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{habit.name}</h1>
      {habit.description && (
        <p style={styles.description}>{habit.description}</p>
      )}
      <div style={styles.section}>
        <LogStudySession habitId={habit._id} onSessionLogged={fetchHabit} />
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Study Heatmap</h2>
        <StudyHeatmap habitId={habit._id} period="month" />
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Streak Information</h2>
        <StreakInfo habitId={habit._id} />
      </div>
      <div style={styles.section}>
        <h2 style={styles.subtitle}>Study Patterns</h2>
        <StudyChart habitId={habit._id} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    height: '100vh',
  },
  loadingText: {
    fontSize: '1.5rem',
    color: '#555',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1rem',
    color: '#333',
  },
  description: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
    color: '#555',
    fontSize: '1.1rem',
  },
  section: {
    marginBottom: '2rem',
  },
  subtitle: {
    marginBottom: '1rem',
    color: '#333',
    fontSize: '1.5rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '0.5rem',
  },
};
