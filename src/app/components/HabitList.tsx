import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Habit {
  _id: string;
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
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this habit?'
    );
    if (!confirmDelete) return;

    const response = await fetch(`/api/habits/${habitId}`, { method: 'DELETE' });
    if (response.ok) {
      setHabits(habits.filter((habit) => habit._id !== habitId));
    } else {
      setError('Error deleting habit');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Your Habits</h3>
      {error && <p style={styles.errorMsg}>{error}</p>}
      {habits.length === 0 ? (
        <p style={styles.noHabitsMessage}>No habits added yet.</p>
      ) : (
        <ul style={styles.habitList}>
          {habits.map((habit) => (
            <li key={habit._id} style={styles.habitItem}>
              <div style={styles.habitInfo}>
                <Link href={`/habits/${habit._id}`}>
                  <span style={styles.habitName}>{habit.name}</span>
                </Link>
                <span style={styles.habitFrequency}>{habit.targetFrequency}</span>
              </div>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(habit._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1rem',
    color: '#333',
    fontSize: '1.5rem',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center' as const,
    marginBottom: '1rem',
  },
  noHabitsMessage: {
    textAlign: 'center' as const,
    color: '#555',
    fontSize: '1rem',
  },
  habitList: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: 0,
  },
  habitItem: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '0.75rem 0',
    borderBottom: '1px solid #ddd',
  },
  habitInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  habitName: {
    fontSize: '1.1rem',
    color: '#0070f3',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  habitFrequency: {
    fontSize: '0.9rem',
    color: '#555',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    cursor: 'pointer',
  },
};
