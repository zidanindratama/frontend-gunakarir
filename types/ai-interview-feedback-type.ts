import { TAiInterviewQuestion } from "./ai-interview-question-type";

export type TAiInterviewFeedback = {
  id: string;
  question_id: string;
  feedback: string;
  created_at: string;
  updated_at: string;
};

export type TInterviewFinalFeedback = {
  application_id: string;
  feedback: string | null;
  created_at: string;
  updated_at: string;
  questions: Array<
    TAiInterviewQuestion & {
      feedback: string | null;
    }
  >;
};
