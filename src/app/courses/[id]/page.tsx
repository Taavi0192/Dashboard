// app/courses/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Tabs from "@/app/components/Tabs";
import { Course } from "@/types/course";
import LessonPlanTab from "@/app/components/LessonPlanTab";
import AssessmentTab from "@/app/components/AssessmentTab";
import MilestonesTab from "@/app/components/MilestonesTab";

interface CoursePageProps {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { id } = params;
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState("milestones");

  const [milestones, setMilestones] = useState([
    "Milestone 1",
    "Milestone 2",
    "Milestone 3",
    "Milestone 4",
  ]);
  const [milestoneProgress, setMilestoneProgress] = useState<number[]>([0,0,0,0]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signin");
      return;
    }

    // Fetch the course details from the API
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course.");
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id, router, session]);

  const handleMilestoneComplete = (index : number) => {
    const newProgress = [...milestoneProgress];
    newProgress[index] = 100;
    setMilestoneProgress(newProgress);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "lessonPlan" && <LessonPlanTab />}
        {activeTab === "milestones" && (<MilestonesTab
        milestones={milestones}
        milestoneProgress={milestoneProgress}
        onMilestoneComplete={handleMilestoneComplete}
        />)}
        {activeTab === "assessments" && <AssessmentTab />}
        {activeTab === "chatbot" && <div>Chatbot Content</div>}
      </div>
    </div>
  );
}
