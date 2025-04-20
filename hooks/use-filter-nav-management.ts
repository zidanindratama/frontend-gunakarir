import { useDecodedToken } from "./use-decoded-token";
import { routePermissions } from "@/middleware";
import { ProjectItem } from "@/types/route-type";

export const useFilteredManagement = (projects: ProjectItem[]) => {
  const decodedToken = useDecodedToken();

  if (!decodedToken) return [];

  const { role } = decodedToken;
  let allowedRoutes: string[] = [];

  switch (role) {
    case "ADMIN":
      allowedRoutes = [
        ...routePermissions.adminRoutes,
        ...routePermissions.baseRoutes,
        ...routePermissions.commonAdminAndRecruiterRoutes,
      ];
      break;
    case "RECRUITER":
      allowedRoutes = [
        ...routePermissions.recruiterRoutes,
        ...routePermissions.baseRoutes,
        ...routePermissions.commonAdminAndRecruiterRoutes,
      ];
      break;
    case "STUDENT":
      allowedRoutes = [
        ...routePermissions.studentRoutes,
        ...routePermissions.baseRoutes,
      ];
      break;
  }

  return projects.filter((project) => allowedRoutes.includes(project.url));
};
