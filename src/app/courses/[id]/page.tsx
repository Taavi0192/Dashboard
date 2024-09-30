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

  const handleMilestoneComplete = async (milestoneKey: string) => {
    if (!course) return;

    try {
      const updatedMilestones = {
        ...course.sections.milestones,
        [milestoneKey]: {
          ...course.sections.milestones[milestoneKey],
          status: true, // Mark milestone as complete
        },
      };

      // Update the milestone status on the server
      const response = await fetch(`/api/courses/${course._id}/milestones/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ milestoneKey }),
      });

      if (response.ok) {
        setCourse({
          ...course,
          sections: {
            ...course.sections,
            milestones: updatedMilestones,
          },
        });
      } else {
        console.error("Failed to update milestone status");
      }
    } catch (error) {
      console.error("Error updating milestone:", error);
    }
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
        {activeTab === "milestones" && (
          <MilestonesTab
            milestones={course.sections.milestones}
            onMilestoneComplete={handleMilestoneComplete}
          />
        )}
        {activeTab === "assessments" && <AssessmentTab />}
        {activeTab === "chatbot" && <div>Chatbot Content</div>}
      </div>
    </div>
  );
}
