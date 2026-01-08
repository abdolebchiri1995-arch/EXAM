
import { Question } from './types';

// The fixed exam date: January 9, 2026, 14:00:00
export const EXAM_START_TIME = new Date('2026-01-09T14:00:00').getTime();
export const EXAM_DURATION_MINUTES = 30;
export const SECONDS_PER_QUESTION = 60;
export const POINTS_PER_CORRECT_ANSWER = 1.5;
export const MAX_VIOLATIONS = 5;

export const BAC_YEARS = [
  '2020', '2021', '2022', '2023', '2024', '2025'
];

export const EXAM_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Choose the correct form: 'He _______ to school every day.'",
    options: ["go", "goes", "going", "gone"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Which of these is a synonym for 'Vast'?",
    options: ["Small", "Huge", "Empty", "Quiet"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "Complete the sentence: 'If I _______ rich, I would travel the world.'",
    options: ["am", "was", "were", "been"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "What is the past participle of the verb 'Write'?",
    options: ["Wrote", "Writing", "Written", "Writes"],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "Choose the correct preposition: 'She is interested _______ learning English.'",
    options: ["on", "at", "in", "with"],
    correctAnswer: 2
  },
  {
    id: 6,
    text: "Identify the antonym of 'Generous':",
    options: ["Kind", "Mean", "Happy", "Brave"],
    correctAnswer: 1
  },
  {
    id: 7,
    text: "Which sentence is in the Present Perfect Tense?",
    options: ["I am eating.", "I ate dinner.", "I have eaten dinner.", "I will eat dinner."],
    correctAnswer: 2
  },
  {
    id: 8,
    text: "What does the idiom 'Piece of cake' mean?",
    options: ["Very difficult", "Very easy", "Something to eat", "A small amount"],
    correctAnswer: 1
  },
  {
    id: 9,
    text: "Choose the correct word: 'The _______ was beautiful today.'",
    options: ["weather", "whether", "wether", "waiter"],
    correctAnswer: 0
  },
  {
    id: 10,
    text: "Identify the adverb in this sentence: 'She ran quickly to the door.'",
    options: ["She", "ran", "quickly", "door"],
    correctAnswer: 2
  },
  {
    id: 11,
    text: "Which of these is an uncountable noun?",
    options: ["Apple", "Book", "Water", "Car"],
    correctAnswer: 2
  },
  {
    id: 12,
    text: "Complete the sentence: 'This is the _______ book I have ever read.'",
    options: ["good", "better", "best", "goodest"],
    correctAnswer: 2
  },
  {
    id: 13,
    text: "Choose the correct passive voice for: 'The chef prepared the meal.'",
    options: ["The meal prepared by the chef.", "The meal was prepared by the chef.", "The chef was prepared the meal.", "The meal is prepared by chef."],
    correctAnswer: 1
  }
];
