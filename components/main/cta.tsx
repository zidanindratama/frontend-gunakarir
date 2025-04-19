"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import { NumberTicker } from "@/components/acernityui/number-ticker";
import { BoxReveal } from "@/components/acernityui/box-reveal";
import Image from "next/image";

export const CTA = () => {
  return (
    <section className="pt-40 pb-16">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-0 items-stretch justify-between">
          <motion.div
            className="lg:w-[60%] space-y-4 flex flex-col justify-between md:space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="gap-4 flex flex-col items-center lg:items-start">
              <BoxReveal>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-500">
                  Mulai Karier Anda bersama{" "}
                  <span className="text-blue-500/80">Gunakarir</span>
                </h2>
              </BoxReveal>
              <BoxReveal boxColor="#8a8a8a">
                <p className="text-md md:text-lg w-full text-muted-foreground max-w-xl">
                  Temukan lowongan kerja terkini, tingkatkan keterampilan, dan
                  wujudkan karier impian melalui layanan rekrutmen yang
                  terpercaya.
                </p>
              </BoxReveal>
            </div>
            <div className="flex flex-row gap-4 md:gap-12 items-center sm:items-start justify-center lg:justify-start">
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start items-end text-4xl font-bold">
                  <NumberTicker value={170} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Perusahaan Mitra
                </p>
              </div>
              <div className="text-center md:text-left">
                <div className="flex justify-center md:justify-start items-end text-4xl font-bold">
                  <NumberTicker value={10} />
                </div>
                <p className="text-sm text-muted-foreground">Kandidat Aktif</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                asChild
                className="bg-[#1877F2] hover:bg-[#0e63d3]"
              >
                <Link
                  className="text-white flex items-center justify-center leading-0"
                  href="#"
                  target="_blank"
                >
                  Bergabung Sekarang
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src={"/main/call-to-action.jpg"}
              alt="cta"
              className="rounded-lg"
              width={600}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
