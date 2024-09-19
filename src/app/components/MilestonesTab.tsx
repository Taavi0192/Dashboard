// Milestones Tab Content (React component)
import { useState } from "react";

interface MilestonesTabProps {
  milestones: string[];
  milestoneProgress: number[];
  onMilestoneComplete: (index: number) => void;
}

export default function MilestonesTab({ milestones, milestoneProgress, onMilestoneComplete }: MilestonesTabProps) {
  return (
    <div>
      <h2>Milestones</h2>
      <ul>
        {milestones.map((milestone, index) => (
          <li key={index}>
            {milestone} - Progress: {milestoneProgress[index]}%
            <button
              onClick={() => onMilestoneComplete(index)}
              disabled={milestoneProgress[index] === 100}
            >
              Mark as Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
