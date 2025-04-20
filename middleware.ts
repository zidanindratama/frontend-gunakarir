import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const routePermissions = {
  authRoutes: ["/sign-in", "/sign-up"],
  baseRoutes: ["/dashboard", "/dashboard/profile"],
  adminRoutes: ["/dashboard/rekruter", "/dashboard/mahasiswa"],
  recruiterRoutes: ["/dashboard/pekerjaan"],
  studentRoutes: ["/dashboard/test-mahasiswa"],
  commonAdminAndRecruiterRoutes: ["/dashboard/test-common"],
};

type UserRole = "ADMIN" | "RECRUITER" | "STUDENT";

const rolePermissions: Record<UserRole, { routes: string[]; deny: boolean }[]> =
  {
    STUDENT: [
      { routes: routePermissions.commonAdminAndRecruiterRoutes, deny: true },
      { routes: routePermissions.adminRoutes, deny: true },
      { routes: routePermissions.recruiterRoutes, deny: true },
    ],
    RECRUITER: [
      { routes: routePermissions.adminRoutes, deny: true },
      { routes: routePermissions.studentRoutes, deny: true },
    ],
    ADMIN: [
      { routes: routePermissions.studentRoutes, deny: true },
      { routes: routePermissions.recruiterRoutes, deny: true },
    ],
  };

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const token = await getCookie("access_token", { req: request });

  // If token exists and trying to access authRoutes, redirect to dashboard
  if (token && routePermissions.authRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // If no token and trying to access protected routes (dashboard), redirect to signup
  if (
    !token &&
    (routePermissions.baseRoutes.includes(pathname) ||
      pathname.startsWith("/dashboard"))
  ) {
    url.pathname = "/sign-up";
    return NextResponse.redirect(url);
  }

  // If token exists, decode and verify user role
  if (token) {
    const user: any = await jwtDecode(token as string);

    const userRole = user.role as UserRole; // Ensure user.role is of type UserRole

    url.pathname = "/access-denied";

    // Check role-specific route access
    for (const permission of rolePermissions[userRole]) {
      if (permission.routes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(url);
      }
    }
  }
}
