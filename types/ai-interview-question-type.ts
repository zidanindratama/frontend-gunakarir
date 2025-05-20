import { TAiInterviewFeedback } from "./ai-interview-feedback-type";

export type TAiInterviewQuestion = {
  id: string;
  aiInterview_id: string;
  question: string;
  answer: string | null;
  created_at: string;
  updated_at: string;
  feedback?: TAiInterviewFeedback | null;
};
