// components/AddHabitForm.tsx
import { useState } from 'react';

interface AddHabitFormProps {
  onHabitAdded: (habit: any) => void;
}

export default function AddHabitForm({ onHabitAdded }: AddHabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetFrequency, setTargetFrequency] = useState<'Daily' | 'Weekly'>('Daily');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, targetFrequency }),
    });

    if (response.ok) {
      const newHabit = await response.json();
      onHabitAdded(newHabit);
      setName('');
      setDescription('');
      setTargetFrequency('Daily');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Error adding habit');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a New Habit</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Habit Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description (optional):</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Target Frequency:</label>
        <select
          value={targetFrequency}
          onChange={(e) => setTargetFrequency(e.target.value as 'Daily' | 'Weekly')}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
      </div>
      <button type="submit">Add Habit</button>
    </form>
  );
}
