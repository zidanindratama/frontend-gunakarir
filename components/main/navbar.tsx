"use client";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar as NavbarResizeable,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/acernityui/navbar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const navItems = [
    {
      name: "Beranda",
      link: "/",
    },
    {
      name: "Pekerjaan",
      link: "/pekerjaan",
    },
    {
      name: "Mitra",
      link: "/",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <NavbarResizeable>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" className="z-20">
              Gabung
            </Button>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex flex-col items-center justify-center gap-4">
              <ModeToggle />
              <Button variant="outline" className="z-20">
                Gabung
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarResizeable>
    </div>
  );
}
