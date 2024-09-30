// app/habits.tsx
"use client"

import { useState } from 'react';
import AddHabitForm from '../components/AddHabitForm';
import HabitList from '../components/HabitList';
import StudyHeatmap from '../components/StudyHeatmap';

export default function HabitsPage() {
  const [refresh, setRefresh] = useState(false);

  const handleHabitAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Habit Tracker</h1>
      <AddHabitForm onHabitAdded={handleHabitAdded} />
      <HabitList refresh={refresh} />
    </div>
  );
}
