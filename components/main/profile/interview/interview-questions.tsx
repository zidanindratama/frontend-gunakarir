"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { TAiInterviewQuestion } from "@/types/ai-interview-question-type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type InterviewQuestionsProps = {
  interviewId: string;
  applicationId: string;
};

const InterviewQuestions = ({
  interviewId,
  applicationId,
}: InterviewQuestionsProps) => {
  const { data: interviewQuestionsData, isLoading } = useGetData({
    queryKey: ["interview-questions", interviewId],
    dataProtected: `ai-interviews/questions/${interviewId}`,
  });

  const interviewQuestions: TAiInterviewQuestion[] =
    interviewQuestionsData?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedAnswers = localStorage.getItem(`answers-${interviewId}`);
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, [interviewId]);

  useEffect(() => {
    localStorage.setItem(`answers-${interviewId}`, JSON.stringify(answers));
  }, [answers, interviewId]);

  const handleChangeAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const currentQuestion = interviewQuestions[currentIndex];

  const postAnswers = usePostData({
    queryKey: "submit-answers",
    dataProtected: `ai-interviews/submit-answers/${interviewId}`,
    backUrl: `/profile/interview/feedback/${applicationId}`,
    successMessage: "Jawaban berhasil dikirim!",
  });

  const handleSubmitAnswers = () => {
    const hasEmptyAnswer = interviewQuestions.some(
      (q) => !answers[q.id] || answers[q.id].trim() === ""
    );

    if (hasEmptyAnswer) {
      return toast("Jawaban tidak boleh kosong!", {
        description: "Silakan isi semua jawaban sebelum mengirim.",
      });
    }

    const payload = {
      answers: interviewQuestions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id].trim(),
      })),
    };

    setIsSubmitting(true);
    postAnswers.mutate(payload, {
      onSuccess: () => {
        localStorage.removeItem(`answers-${interviewId}`);
        setAnswers({});
        setCurrentIndex(0);
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
        <div className="container mx-auto px-4 py-36 md:px-10 space-y-6">
          <Skeleton className="w-full h-[100px] rounded-md" />
          <Skeleton className="w-full h-[150px] rounded-md" />
          <div className="flex justify-between">
            <Skeleton className="w-[120px] h-[40px] rounded-md" />
            <Skeleton className="w-[160px] h-[40px] rounded-md" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:py-72 md:px-10">
        {currentQuestion && (
          <div className="space-y-10">
            <div className="px-4 py-6 border w-full rounded-md">
              <h1 className="font-semibold text-center text-lg">
                {currentQuestion.question}
              </h1>
            </div>
            <Textarea
              placeholder="Masukkan jawabanmu di sini"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) =>
                handleChangeAnswer(currentQuestion.id, e.target.value)
              }
              disabled={isSubmitting}
            />
            <div className="flex justify-between">
              <Button
                className="bg-blue-500 dark:text-white dark:bg-blue-800"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={currentIndex === 0 || isSubmitting}
              >
                Sebelumnya
              </Button>

              {currentIndex < interviewQuestions.length - 1 ? (
                <Button
                  className="bg-blue-500 dark:text-white dark:bg-blue-800"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(prev + 1, interviewQuestions.length - 1)
                    )
                  }
                  disabled={isSubmitting}
                >
                  Selanjutnya
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitAnswers}
                  disabled={isSubmitting}
                  className="bg-green-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Jawaban"
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InterviewQuestions;
