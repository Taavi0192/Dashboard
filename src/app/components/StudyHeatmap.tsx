// components/StudyHeatmap.tsx
import { useState, useEffect } from 'react';
import Heatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface HeatmapValue {
  date: string;
  count: number;
}

interface StudySession {
  startTime: string;
  duration: number;
}

interface StudyHeatmapProps {
  habitId: string;
  period: 'week' | 'month';
}

export default function StudyHeatmap({ habitId, period }: StudyHeatmapProps) {
  const [data, setData] = useState<HeatmapValue[]>([]);

  const fetchData = async () => {
    const response = await fetch(`/api/study-sessions/data?habitId=${habitId}&period=${period}`);
    if (response.ok) {
      const sessions: StudySession[] = await response.json();

      // Aggregate data
      const dateMap: { [key: string]: number } = {};
      sessions.forEach((session) => {
        const date = new Date(session.startTime).toISOString().split('T')[0];
        if (!dateMap[date]) {
          dateMap[date] = 0;
        }
        dateMap[date] += session.duration;
      });

      const heatmapData: HeatmapValue[] = Object.keys(dateMap).map((date) => ({
        date,
        count: dateMap[date],
      }));

      setData(heatmapData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [habitId, period]);

  return (
    <div>
      <Heatmap
        startDate={new Date(new Date().setDate(new Date().getDate() - (period === 'week' ? 6 : 29)))}
        endDate={new Date()}
        values={data}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          // Define color scale based on value.count
          if (value.count >= 120) {
            return 'color-scale-4';
          } else if (value.count >= 60) {
            return 'color-scale-3';
          } else if (value.count >= 30) {
            return 'color-scale-2';
          } else {
            return 'color-scale-1';
          }
        }}
      />
    </div>
  );
}
