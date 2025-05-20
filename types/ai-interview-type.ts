import { TAiInterviewQuestion } from "./ai-interview-question-type";

export type TAiInterview = {
  id: string;
  application_id: string;
  feedback: string | null;
  created_at: string;
  updated_at: string;
  questions: TAiInterviewQuestion[];
};
