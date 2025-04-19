import { Background } from "@/components/acernityui/background";
import { TextReveal } from "@/components/magicui/text-reveal";
import { Bento } from "@/components/main/bento";
import CTA from "@/components/main/cta";
import { FAQ } from "@/components/main/faq";
import Footer from "@/components/main/footer";
import { HeroScroll } from "@/components/main/hero-scroll";
import { Navbar } from "@/components/main/navbar";
import React from "react";

const MainPage = () => {
  return (
    <div className="p-6">
      <Navbar />
      <Background />
      <HeroScroll />
      <Bento />
      <CTA />
      <TextReveal>
        Temukan peluang, kembangkan potensi, dan mulai langkah nyata menuju
        karier impianmu.
      </TextReveal>
      <FAQ />
      <Footer />
    </div>
  );
};

export default MainPage;
