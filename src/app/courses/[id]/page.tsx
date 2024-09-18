// app/courses/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Tabs from "@/app/components/Tabs";
import { Course } from "@/types/course";

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
  const [activeTab, setActiveTab] = useState("lessonPlan");

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

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "lessonPlan" && <div>Lesson Plan Generator Content</div>}
        {activeTab === "milestones" && <div>Milestones Content</div>}
        {activeTab === "assessments" && <div>Assessments Content</div>}
        {activeTab === "chatbot" && <div>Chatbot Content</div>}
      </div>
    </div>
  );
}
