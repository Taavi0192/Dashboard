// Lesson Plan Generator Tab Content (React component)
import { useState } from "react";

export default function LessonPlanTab() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [units, setUnits] = useState(4);
  const [milestones, setMilestones] = useState(["Milestone 1", "Milestone 2", "Milestone 3", "Milestone 4"]);
  const [milestoneProgress, setMilestoneProgress] = useState<number[]>([0, 0, 0, 0]);

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPdfFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the uploaded PDF and lesson plan criteria
    console.log("PDF:", pdfFile);
    console.log("Difficulty:", difficulty);
    console.log("Units:", units);
    // Divide units into milestones (you can implement real logic later)
    setMilestones(generateMilestones(units));
  };

  const handleDownload = () => {
    // Logic for downloading lesson plan (mock link for now)
    const link = document.createElement("a");
    link.href = "#";
    link.download = "lesson-plan.pdf";
    link.click();
  };

  const generateMilestones = (units: number) => {
    const milestoneCount = 4; // Fixed number of milestones
    const unitsPerMilestone = Math.ceil(units / milestoneCount);
    return Array.from({ length: milestoneCount }, (_, i) => `Milestone ${i + 1} (Units: ${i * unitsPerMilestone + 1} - ${(i + 1) * unitsPerMilestone})`);
  };

  return (
    <div>
      <h2>Lesson Plan Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload PDF:</label>
          <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        </div>
        <div>
          <label>Difficulty Level:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Beginner">Beginner</option>
            <option value="Novice">Novice</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
        <div>
          <label>Number of Units:</label>
          <input
            type="number"
            min={4}
            max={12}
            value={units}
            onChange={(e) => setUnits(parseInt(e.target.value, 10))}
          />
        </div>
        <button type="submit">Generate Lesson Plan</button>
      </form>

      <div>
        <h3>Milestones</h3>
        <ul>
          {milestones.map((milestone, index) => (
            <li key={index}>
              {milestone} - Progress: {milestoneProgress[index]}%
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleDownload}>Download Lesson Plan</button>
    </div>
  );
}
