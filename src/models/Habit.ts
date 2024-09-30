// models/Habit.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Habit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  targetFrequency: 'Daily' | 'Weekly';
  creationDate: Date;
}

const HabitSchema: Schema<Habit> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  targetFrequency: { type: String, enum: ['Daily', 'Weekly'], default: 'Daily' },
  creationDate: { type: Date, default: Date.now },
});

export const Habit: Model<Habit> =
  mongoose.models.Habit || mongoose.model<Habit>('Habit', HabitSchema);
