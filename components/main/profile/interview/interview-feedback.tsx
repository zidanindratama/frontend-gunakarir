"use client";

import { useGetData } from "@/hooks/use-get-data";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NotFoundContent from "../../not-found-content";
import { TInterviewFinalFeedback } from "@/types/ai-interview-feedback-type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReactMarkdown from "react-markdown";

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
      <div className="container mx-auto px-4 py-36 md:px-10 space-y-10">
        <div className="p-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md">
          <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-100 mb-2">
            Ringkasan Evaluasi
          </h2>
          <div className="text-blue-700 dark:text-blue-200 whitespace-pre-line">
            <ReactMarkdown>
              {feedbackData.feedback || "Belum ada feedback untuk jawaban ini."}
            </ReactMarkdown>
          </div>
        </div>
        <Accordion type="multiple" className="space-y-2">
          {feedbackData.questions.map((q, i) => (
            <AccordionItem value={`item-${i}`} key={q.id}>
              <AccordionTrigger>
                {i + 1}. {q.question}
              </AccordionTrigger>
              <AccordionContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Jawaban Anda:</p>
                  <p className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-md whitespace-pre-line">
                    {q.answer || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Feedback AI:</p>
                  <div className="prose prose-sm dark:prose-invert bg-gray-50 dark:bg-neutral-800 p-3 rounded-md max-w-none">
                    <ReactMarkdown>
                      {q.feedback || "Belum ada feedback untuk jawaban ini."}
                    </ReactMarkdown>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default InterviewFeedback;
