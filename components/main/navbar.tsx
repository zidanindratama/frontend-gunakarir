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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/data/navbar-items";
import { TUser } from "@/types/user-type";
import { useDeleteData } from "@/hooks/use-delete-data";
import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axiosInstance from "@/helpers/axios-instance";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = Cookies.get("access_token");

  const { mutate: signout } = useDeleteData({
    queryKey: "user-me",
    dataProtected: "auth/signout",
    backUrl: "/",
    successMessage: "Signout berhasil!",
  });

  const handleSignout = () => {
    Cookies.remove("access_token");
    signout();
    setUser(null);
  };

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [accessToken]);

  return (
    <div className="relative w-full">
      <NavbarResizeable>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <ModeToggle />
            {isLoading ? (
              <Button variant="outline" className="z-20" disabled>
                Memuat...
              </Button>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user.image_url} />
                    <AvatarFallback>GN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-5" align="center">
                  <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href={"/dashboard/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={"/dashboard"}>Dashboard</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignout}>
                    Signout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="z-20" asChild>
                <Link href="/sign-up">Gabung</Link>
              </Button>
            )}
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
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex flex-col items-center justify-center gap-4">
              <ModeToggle />
              {isLoading ? (
                <Button variant="outline" className="z-20" disabled>
                  Memuat...
                </Button>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user.image_url} />
                      <AvatarFallback>GN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-5" align="center">
                    <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href={"/dashboard/profile"}>Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href={"/dashboard"}>Profile</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignout}>
                      Signout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" className="z-20" asChild>
                  <Link href="/sign-up">Gabung</Link>
                </Button>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarResizeable>
    </div>
  );
}
