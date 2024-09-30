// components/StudyChart.tsx
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface StudyChartProps {
  habitId: string;
}

interface ChartDataPoint {
  date: string;
  duration: number;
}

export default function StudyChart({ habitId }: StudyChartProps) {
  const [data, setData] = useState<ChartDataPoint[]>([]);

  const fetchData = async () => {
    const response = await fetch(`/api/study-sessions/data?habitId=${habitId}&period=month`);
    if (response.ok) {
      const sessions = await response.json();

      // Aggregate data by day
      const dateMap: { [key: string]: number } = {};
      sessions.forEach((session: any) => {
        const date = new Date(session.startTime).toISOString().split('T')[0];
        if (!dateMap[date]) {
          dateMap[date] = 0;
        }
        dateMap[date] += session.duration;
      });

      const chartData = Object.keys(dateMap).map((date) => ({
        date,
        duration: dateMap[date],
      }));

      // Sort data by date
      chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setData(chartData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [habitId]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis dataKey="duration" />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="duration" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
