// components/Tabs.tsx
import React from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div>
      <button
        onClick={() => setActiveTab("lessonPlan")}
        className={activeTab === "lessonPlan" ? "active" : ""}
      >
        Lesson Plan
      </button>
      <button
        onClick={() => setActiveTab("milestones")}
        className={activeTab === "milestones" ? "active" : ""}
      >
        Milestones
      </button>
      <button
        onClick={() => setActiveTab("assessments")}
        className={activeTab === "assessments" ? "active" : ""}
      >
        Assessments
      </button>
      <button
        onClick={() => setActiveTab("chatbot")}
        className={activeTab === "chatbot" ? "active" : ""}
      >
        Chatbot
      </button>
      <style jsx>{`
        button {
          margin-right: 8px;
          padding: 8px 16px;
          border: none;
          cursor: pointer;
        }
        .active {
          font-weight: bold;
          color: white;
          background-color: #0070f3;
        }
      `}</style>
    </div>
  );
}
