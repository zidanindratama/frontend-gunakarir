import { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

export type ProjectItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

export type RouteItems = {
  navMain: NavItem[];
  navSecondary: NavItem[];
  managementNav: ProjectItem[];
};
