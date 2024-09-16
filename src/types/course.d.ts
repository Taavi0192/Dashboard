// src/types/course.d.ts
import { ObjectId } from "mongodb";


interface LessonPlan {
  // Define fields for lesson plans
}

interface Milestones {
  // Define fields for milestones
}

interface Assessments {
  // Define fields for assessments
}

interface Chatbot {
  // Define fields for chatbot
}

export interface Course {
  _id?: ObjectId;
  userId: string; // Changed to string
  title: string;
  description: string;
  sections: {
    lessonPlan: LessonPlan;
    milestones: Milestones;
    assessments: Assessments;
    chatbot: Chatbot;
  };
  unitsCovered: number;
  totalUnits: number;
  createdAt: Date;
  updatedAt: Date;
}

