// components/StreakInfo.tsx
import { useState, useEffect } from 'react';

interface StreakInfoProps {
  habitId: string;
}

export default function StreakInfo({ habitId }: StreakInfoProps) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const fetchStreaks = async () => {
    const response = await fetch(`/api/streaks?habitId=${habitId}`);
    if (response.ok) {
      const data = await response.json();
      setCurrentStreak(data.currentStreak);
      setLongestStreak(data.longestStreak);
    }
  };

  useEffect(() => {
    fetchStreaks();
  }, [habitId]);

  return (
    <div>
      <p>Current Streak: {currentStreak} days</p>
      <p>Longest Streak: {longestStreak} days</p>
    </div>
  );
}
