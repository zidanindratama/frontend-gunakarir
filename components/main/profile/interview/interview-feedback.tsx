"use client";

import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NotFoundContent from "../../not-found-content";
import { TInterviewFinalFeedback } from "@/types/ai-interview-feedback-type";

type Props = { applicationId: string };

const InterviewFeedback = ({ applicationId }: Props) => {
  const router = useRouter();

  const { data: evaluateInterviewData, isLoading } = useGetData({
    queryKey: ["interview-feedback", applicationId],
    dataProtected: `ai-interviews/detail/${applicationId}`,
  });

  const feedbackData: TInterviewFinalFeedback = evaluateInterviewData?.data;

  useEffect(() => {
    if (!isLoading && feedbackData && !feedbackData.feedback) {
      router.replace("/profile");
    }
  }, [feedbackData, isLoading, router]);

  if (isLoading) {
    return (
      <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
        <div className="container mx-auto px-4 py-36 md:px-10">
          <div className="space-y-4">
            <Skeleton className="w-1/2 h-18" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </div>
        </div>
      </section>
    );
  }

  if (!feedbackData) {
    return <NotFoundContent message="Feedback tidak ditemukan." />;
  }

  return (
    <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
      <div className="container mx-auto px-4 py-36 md:px-10">
        <div className="space-y-10">
          <div className="p-6 bg-gray-100 dark:bg-neutral-800 rounded-md border">
            <h2 className="font-bold text-xl mb-2">Final Feedback dari AI</h2>
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
              {feedbackData.feedback}
            </p>
          </div>

          <div className="space-y-6">
            {feedbackData.questions.map((q, i: number) => (
              <div
                key={q.id}
                className="p-6 border rounded-md bg-white dark:bg-neutral-900 space-y-2"
              >
                <h3 className="font-semibold text-lg">
                  {i + 1}. {q.question}
                </h3>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jawaban Anda:</p>
                  <p className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-md whitespace-pre-line">
                    {q.answer || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mt-3 mb-1">
                    Feedback AI:
                  </p>
                  <p className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-md whitespace-pre-line">
                    {q.feedback || "Belum ada feedback untuk jawaban ini."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewFeedback;
