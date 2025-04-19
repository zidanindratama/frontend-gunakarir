"use client";
import { Badge } from "@/components/ui/badge";
import { AnimatedShinyText } from "@/components/acernityui/animated-shiny-text";
import { ContainerScroll } from "@/components/acernityui/container-scroll-animation";
import React from "react";
import Image from "next/image";

export function HeroScroll() {
  return (
    <div id="home" className="flex flex-col overflow-hidden relative z-1">
      <ContainerScroll
        titleComponent={
          <>
            <Badge
              variant="outline"
              className="-top-4 py-1 px-3 font-medium hover:animate-bounce cursor-default relative gap-1.5 rounded-full bg-gradient-to-r from-blue-500/30 to-blue-500/20"
            >
              <span
                className="size-1.5 rounded-full bg-blue-500"
                aria-hidden="true"
              ></span>
              <AnimatedShinyText>Terverifikasi PDDikti</AnimatedShinyText>
            </Badge>
            <h1 className="text-xl relative md:text-4xl font-semibold text-black dark:text-white">
              Bantu Mahasiswa Gunadarma <br />
              <span className="left-3/7 top-2/6 md:top-1/4 rotate-6 absolute bg-blue-500 text-sm md:text-3xl cursor-default hover:rotate-12 transition-transform text-white pb-1 md:pb-2 px-2 md:px-3">
                kejar
              </span>
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Karir Impian
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/main/banner.jpg`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover max-w-auto h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
