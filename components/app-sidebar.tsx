"use client";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import * as React from "react";
import { routeItems } from "@/data/route-items";
import { useFilteredNavMain } from "@/hooks/use-filter-nav-main";
import { useFilteredManagement } from "@/hooks/use-filter-nav-management";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import { NavManagement } from "./nav-management";
import { NavbarLogo } from "./acernityui/navbar";
import { ModeToggle } from "./ui/mode-toggle";
import { LayoutDashboard } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });

  const user: TUser = userData?.data;

  const filteredMainNav = useFilteredNavMain(routeItems.navMain);
  const filteredManagement = useFilteredManagement(routeItems.managementNav);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center justify-between gap-14">
            <NavbarLogo />
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Beranda</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"/dashboard"}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {filteredManagement.length > 0 && (
          <NavManagement projects={filteredManagement} />
        )}
        {filteredMainNav.length > 0 && <NavMain items={filteredMainNav} />}
        <NavSecondary items={routeItems.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          username={user?.username}
          image_url={user?.image_url}
          email={user?.email}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
