// app/components/LessonPlanTab.tsx
'use client';

import { useState } from 'react';

export default function LessonPlanTab() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState('Beginner');
  const [units, setUnits] = useState(4);
  const [lessonPlan, setLessonPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPdfFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLessonPlan('');
  
    if (!pdfFile) {
      setError('Please upload a PDF file.');
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('units', units.toString());
      formData.append('difficulty', difficulty);
  
      const response = await fetch('/api/lesson-plan', {
        method: 'POST',
        body: formData,
      });
  
      const contentType = response.headers.get('content-type');
      let data;
  
      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Unexpected response format:', text);
        setError('Unexpected response from server.');
        return;
      }
  
      if (!response.ok) {
        setError(data.message || 'Failed to generate lesson plan.');
      } else {
        setLessonPlan(data.lessonPlan);
      }
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      setError('An error occurred while generating the lesson plan.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (!lessonPlan) {
      console.error('No lesson plan to download');
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([lessonPlan], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'lesson-plan.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Lesson Plan'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {lessonPlan && (
        <div>
          <h3>Generated Lesson Plan</h3>
          <pre>{lessonPlan}</pre>
          <button onClick={handleDownload}>Download Lesson Plan</button>
        </div>
      )}
    </div>
  );
}
