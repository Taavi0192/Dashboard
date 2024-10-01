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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.title}>Add a New Habit</h3>
        {error && <p style={styles.errorMsg}>{error}</p>}
        <div style={styles.formGroup}>
          <label style={styles.label}>Habit Name:</label>
          <input
            type="text"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description (optional):</label>
          <textarea
            style={{ ...styles.input, height: '80px', resize: 'vertical' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Target Frequency:</label>
          <select
            style={styles.select}
            value={targetFrequency}
            onChange={(e) => setTargetFrequency(e.target.value as 'Daily' | 'Weekly')}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Add Habit
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '30px auto',
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
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
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#555',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    appearance: 'none' as const,
    backgroundColor: '#fff',
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3e%3cpath%20fill='%23666'%20d='M2%200L0%202h4L2%200zM2%205L0%203h4L2%205z'/%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem top 50%',
    backgroundSize: '8px 10px',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};
