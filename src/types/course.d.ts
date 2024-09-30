// src/types/course.d.ts
import { ObjectId } from "mongodb";


interface LessonPlan {
  // Define fields for lesson plans
}

interface Unit {
  title: string;
  description: string;
  completed?: boolean;
}

interface Milestone {
  unitsIncluded: {
    Unit1: Unit;
    Unit2: Unit;
    Unit3: Unit;
  };
  status: boolean;
}

interface Milestones {
  Milestone1: Milestone;
  Milestone2: Milestone;
  Milestone3: Milestone;
  Milestone4: Milestone;
  [milestoneKey: string]: Milestone;
}

interface Assessments {
  // Define fields for assessments
}

interface Chatbot {
  // Define fields for chatbot
}

export interface Course {
  _id?: ObjectId;
  userId: string;
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

