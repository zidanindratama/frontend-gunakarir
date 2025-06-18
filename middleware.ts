import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const routePermissions = {
  authRoutes: ["/sign-in", "/sign-up"],
  baseRoutes: ["/dashboard"],
  adminRoutes: [
    "/dashboard/rekruter",
    "/dashboard/mahasiswa",
    "/dashboard/umpan-balik",
  ],
  recruiterRoutes: ["/dashboard/pekerjaan"],
  studentRoutes: ["/profile"],
  commonAdminAndRecruiterRoutes: ["/dashboard/profile"],
};

type UserRole = "ADMIN" | "RECRUITER" | "STUDENT";

const rolePermissions: Record<UserRole, { routes: string[]; deny: boolean }[]> =
  {
    STUDENT: [
      { routes: routePermissions.commonAdminAndRecruiterRoutes, deny: true },
      { routes: routePermissions.adminRoutes, deny: true },
      { routes: routePermissions.recruiterRoutes, deny: true },
      { routes: routePermissions.baseRoutes, deny: true },
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

  // If token exists and trying to access authRoutes, redirect based on role
  if (token && routePermissions.authRoutes.includes(pathname)) {
    try {
      const user: any = jwtDecode(token);
      const userRole = user.role as UserRole;

      if (userRole === "STUDENT") {
        url.pathname = "/profile";
      } else if (userRole === "RECRUITER") {
        url.pathname = "/dashboard";
      } else if (userRole === "ADMIN") {
        url.pathname = "/dashboard";
      }

      return NextResponse.redirect(url);
    } catch (error) {
      console.error("Error decoding token:", error);
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }

  // If no token and trying to access protected routes (dashboard), redirect to signup
  if (
    !token &&
    (routePermissions.baseRoutes.includes(pathname) ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile"))
  ) {
    url.pathname = "/sign-up";
    return NextResponse.redirect(url);
  }

  // If token exists, decode and verify user role
  if (token && typeof token === "string" && token.split(".").length === 3) {
    try {
      const user: any = jwtDecode(token);
      const userRole = user.role as UserRole;

      url.pathname = "/access-denied";

      for (const permission of rolePermissions[userRole]) {
        if (permission.routes.some((route) => pathname.startsWith(route))) {
          return NextResponse.redirect(url);
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
  }
}
