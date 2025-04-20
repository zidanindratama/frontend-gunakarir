import { routePermissions } from "@/middleware";
import { NavItem } from "@/types/route-type";
import { useDecodedToken } from "./use-decoded-token";

export const useFilteredNavMain = (menu: NavItem[]) => {
  const decodedToken = useDecodedToken();

  if (!decodedToken) return [];

  const { role } = decodedToken;
  let allowedRoutes: string[] = [];

  switch (role) {
    case "ADMIN":
      allowedRoutes = [
        ...routePermissions.baseRoutes,
        ...routePermissions.adminRoutes,
        ...routePermissions.commonAdminAndRecruiterRoutes,
      ];
      break;
    case "RECRUITER":
      allowedRoutes = [
        ...routePermissions.baseRoutes,
        ...routePermissions.recruiterRoutes,
        ...routePermissions.commonAdminAndRecruiterRoutes,
      ];
      break;
    case "STUDENT":
      allowedRoutes = [
        ...routePermissions.baseRoutes,
        ...routePermissions.studentRoutes,
      ];
      break;
  }

  return menu.filter((nav) =>
    nav.items?.some((item) => allowedRoutes.includes(item.url))
  );
};
