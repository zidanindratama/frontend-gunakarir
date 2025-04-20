"use client";

import { cn } from "@/lib/utils";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/acernityui/bento-grid";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function Benefit() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -200px 0px",
  });

  return (
    <div ref={containerRef}>
      <BentoGrid className="max-w-5xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
            index={i}
            isInView={isInView}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-1/2 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex items-center justify-end space-x-3 p-3 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700"
      >
        <div className="flex-1 space-y-2">
          <div className="w-3/5 h-4 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="w-2/4 h-3 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1  h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div className="h-full w-full rounded-lg"></motion.div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: { x: 20, rotate: -5 },
    hover: { x: 0, rotate: 0 },
  };
  const second = {
    initial: { x: -20, rotate: 5 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] px-12 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src="/main/ava-1.png"
          alt="avatar"
          height={100}
          width={100}
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 dark:text-white mt-4">
          Pengalaman pertama wawancara terasa menegangkan.
        </p>
        <p className="border border-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Pemula
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <Image
          src="/main/ava-2.png"
          alt="avatar"
          height={100}
          width={100}
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 dark:text-white mt-4">
          Portofolio telah siap, menunggu peluang.
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Siap Kerja
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Image
          src="/main/ava-3.png"
          alt="avatar"
          height={100}
          width={100}
          className="rounded-full h-10 w-10"
        />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 dark:text-white mt-4">
          Belum ada tanggapan dari lamaran.
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Butuh Dukungan
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="/main/ava-4.png"
          alt="avatar"
          height={100}
          width={100}
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500 dark:text-white">
          Masih mempertimbangkan antara melanjutkan belajar Next.js atau
          menyempurnakan CV.
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500 dark:text-white">
          Tetap tenang, konsistensi lebih penting dari kecepatan.
        </p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Menyeimbangkan Studi dan Karier",
    description: (
      <span className="text-sm">
        Membangun karier sambil menempuh pendidikan secara bersamaan.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: (
      <IconClipboardCopy className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    title: "Komunitas Pencari Kerja",
    description: (
      <span className="text-sm">
        Berbagi pengalaman dan tantangan dalam proses mencari pekerjaan.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: (
      <IconFileBroken className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    title: "Tips Karier Profesional",
    description: (
      <span className="text-sm">
        Informasi praktis seputar pembuatan CV hingga negosiasi gaji.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: (
      <IconSignature className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    title: "Berbagi Pengalaman Karier",
    description: (
      <span className="text-sm">
        Kisah perjalanan karier dari berbagai latar belakang profesional.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: (
      <IconTableColumn className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    title: "Diskusi Seputar Dunia Kerja",
    description: (
      <span className="text-sm">
        Wadah diskusi santai mengenai isu dan tren dunia profesional.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: (
      <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];
