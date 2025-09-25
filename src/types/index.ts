export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  field: string;
  stage: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  goals: string[];
  badges: Badge[];
  points: number;
  streak: number;
  lastUpdate: Date;
}

export interface LearningPlan {
  id: string;
  field: string;
  stages: {
    beginner: Goal[];
    intermediate: Goal[];
    advanced: Goal[];
  };
  estimatedDuration: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  notes: string;
  quizId: string;
  completed: boolean;
  stage: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  completedAt?: Date;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'book' | 'course' | 'practice';
  duration?: string;
}

export interface Quiz {
  id: string;
  goalId: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  field: string;
  points: number;
  participants: number;
  deadline: Date;
  completed: boolean;
}

export interface AIRecommendation {
  id: string;
  userId: string;
  type: 'goal' | 'resource' | 'challenge' | 'motivation';
  content: string;
  confidence: number;
  createdAt: Date;
}