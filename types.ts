
export interface Student {
  firstName: string;
  lastName: string;
  bacYear: string;
  deviceId: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamResult {
  score: number;
  totalCorrect: number;
  timeTaken: number;
  violations: number;
  timestamp: number;
}

export enum AppState {
  LOGIN = 'LOGIN',
  INSTRUCTIONS = 'INSTRUCTIONS',
  EXAM = 'EXAM',
  RESULT = 'RESULT',
  EXCLUDED = 'EXCLUDED'
}
