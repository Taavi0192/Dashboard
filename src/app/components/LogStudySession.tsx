// components/LogStudySession.tsx
import { useState } from 'react';

interface LogStudySessionProps {
  habitId: string;
  onSessionLogged: () => void;
}

export default function LogStudySession({ habitId, onSessionLogged }: LogStudySessionProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!startTime || !endTime) {
      setError('Please provide start and end times.');
      return;
    }

    const response = await fetch('/api/study-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habitId, startTime, endTime }),
    });

    if (response.ok) {
      onSessionLogged();
      setStartTime('');
      setEndTime('');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Error logging study session');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log Study Session</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log Session</button>
    </form>
  );
}
