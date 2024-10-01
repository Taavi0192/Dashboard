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
  const { data: session, status } = useSession();
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
  }, [id, router, session, status]);

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
      const response = await fetch(
        `/api/courses/${course._id}/milestones/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ milestoneKey }),
        }
      );

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
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{course.title}</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={styles.content}>
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

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "1.5rem",
    color: "#333",
  },
  content: {
    marginTop: "2rem",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    height: "100vh",
  },
  loadingText: {
    fontSize: "1.5rem",
    color: "#555",
  },
};
