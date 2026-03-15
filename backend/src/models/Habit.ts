import { Schema, model } from 'mongoose';
import type { Document, Types } from 'mongoose';

export interface IHabit extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  status: 'active' | 'established';
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: Date;
  color?: string;
  icon?: string;
}

const habitSchema = new Schema<IHabit>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  status: {
    type: String,
    enum: ['active', 'established'],
    default: 'active'
  },
  currentStreak: { 
    type: Number, 
    default: 0 
  },
  longestStreak: { 
    type: Number, 
    default: 0 
  },
  lastCompletedDate: { 
    type: Date 
  },
  color: { 
    type: String 
  },
  icon: { 
    type: String 
  }
}, {
  timestamps: true
});

export const Habit = model<IHabit>('Habit', habitSchema);
