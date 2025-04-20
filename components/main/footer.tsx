"use client";

import { Button } from "@/components/ui/button";
import { socialLinkItems } from "@/data/social-link-items";
import { footerLinkItems } from "@/data/footer-link-items";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-12 md:px-10">
        <div className="flex flex-col items-start justify-between gap-12 space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">GunaKarir</span>
            </Link>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
              Portal karier resmi mahasiswa & alumni Universitas Gunadarma
            </p>
            <div className="flex space-x-4 mt-4">
              {socialLinkItems.map((social, idx) => (
                <Link
                  key={`social-${idx}`}
                  href={social.href}
                  aria-label={social.label}
                  className="text-neutral-600 hover:rotate-10 hover:scale-125 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {footerLinkItems.map((section, idx) => (
            <div
              key={`footer-section-${idx}`}
              className="flex flex-col space-y-4"
            >
              <h3 className="font-semibold text-black dark:text-white">
                {section.title}
              </h3>
              <ul className="flex flex-col space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={`footer-link-${idx}-${linkIdx}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800 md:flex-row">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            &copy; {currentYear} GunaKarir. Made by{" "}
            <Link
              className="hover:text-blue-500 transition-colors"
              href={socialLinkItems[0].href}
            >
              Zidan Indratama
            </Link>
            . All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 md:mt-0">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
