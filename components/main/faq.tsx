"use client";
import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import React, { useRef, useState } from "react";
import { BoxReveal } from "@/components/acernityui/box-reveal";
import { faqItems } from "@/data/faq-items";

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-neutral-200 dark:border-white/[0.2] rounded-xl overflow-hidden bg-white dark:bg-black mb-4 shadow-input dark:shadow-primary/20 transition-all duration-200 hover:shadow-lg">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-left"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        whileTap={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <h3 className="text-sm md:text-lg font-medium text-neutral-800 dark:text-neutral-200">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-neutral-500"
        >
          <IconChevronDown size={20} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-neutral-600 dark:text-neutral-400 md:text-sm text-xs bg-neutral-50 dark:bg-neutral-900/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -400px 0px",
  });

  return (
    <div
      className="pb-48 px-4 max-w-5xl mx-auto min-h-screen"
      id="faq"
      ref={containerRef}
    >
      <div className="flex flex-col items-center">
        <BoxReveal>
          <h2 className="mx-auto text-3xl md:text-7xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-bl from-blue-300 to-blue-500">
            FAQ
          </h2>
        </BoxReveal>
      </div>
      <p className="text-sm md:text-lg text-center text-neutral-600 dark:text-neutral-400 mb-12 mx-auto">
        Beberapa pertanyaan yang akan dijawab kalau kami tidak sedang scroll
        Fesnuk
      </p>

      <div className="space-y-2 md:space-y-4">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.15, // Sequential delay based on item index
                      ease: [0.22, 1, 0.36, 1], // Custom spring-like easing
                    },
                  }
                : {}
            }
          >
            <FAQItem question={item.question} answer={item.answer} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
