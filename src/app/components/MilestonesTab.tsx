// src/components/MilestonesTab.tsx

import { Milestones, Unit } from "@/types/course";

interface MilestonesTabProps {
  milestones: Milestones;
  onMilestoneComplete: (milestoneKey: string) => void;
}

export default function MilestonesTab({
  milestones,
  onMilestoneComplete,
}: MilestonesTabProps) {
  return (
    <div>
      <h2>Milestones</h2>
      <ul>
        {Object.entries(milestones).map(([milestoneKey, milestone]) => (
          <li key={milestoneKey}>
            <strong>{milestoneKey}</strong> - Status:{" "}
            {milestone.status ? "Complete" : "Incomplete"}
            <button
              onClick={() => onMilestoneComplete(milestoneKey)}
              disabled={milestone.status}
            >
              Mark as Complete
            </button>
            <ul>
              {Object.entries(milestone.unitsIncluded).map(
                ([unitKey, unit]) => {
                  const typedUnit = unit as Unit;
                  return (
                    <li key={unitKey}>
                      <strong>{typedUnit.title}</strong>:{" "}
                      {typedUnit.description} - Completed:{" "}
                      {typedUnit.completed ? "Yes" : "No"}
                    </li>
                  );
                }
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
