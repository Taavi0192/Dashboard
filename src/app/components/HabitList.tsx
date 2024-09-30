// components/HabitList.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Habit {
  habitId: string;
  name: string;
  description?: string;
  targetFrequency: 'Daily' | 'Weekly';
  creationDate: string;
}

interface HabitListProps {
  refresh: boolean;
}

export default function HabitList({ refresh }: HabitListProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [error, setError] = useState('');

  const fetchHabits = async () => {
    const response = await fetch('/api/habits');
    if (response.ok) {
      const data = await response.json();
      setHabits(data);
    } else {
      setError('Error fetching habits');
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [refresh]);

  const handleDelete = async (habitId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this habit?');
    if (!confirmDelete) return;

    const response = await fetch(`/api/habits/${habitId}`, { method: 'DELETE' });
    if (response.ok) {
      setHabits(habits.filter((habit) => habit.habitId !== habitId));
    } else {
      setError('Error deleting habit');
    }
  };

  return (
    <div>
      <h3>Your Habits</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {habits.length === 0 ? (
        <p>No habits added yet.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit._id}>
              <Link href={`/habits/${habit._id}`}>
                <strong>{habit.name}</strong>
              </Link>{' '}
              - {habit.targetFrequency}
              <button onClick={() => handleDelete(habit._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
