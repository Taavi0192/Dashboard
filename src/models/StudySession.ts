// models/StudySession.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IStudySession extends Document {
  userId: mongoose.Types.ObjectId;
  habitId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
}

const StudySessionSchema: Schema<IStudySession> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  habitId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  duration: { type: Number, required: true },
});

export const StudySession: Model<IStudySession> =
  mongoose.models.StudySession ||
  mongoose.model<IStudySession>('StudySession', StudySessionSchema);
