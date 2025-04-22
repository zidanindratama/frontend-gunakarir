import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: number;
  email: string;
  role: "STUDENT" | "RECRUITER" | "ADMIN";
  exp: number;
  iat: number;
}

export const useDecodedToken = (): DecodedToken | undefined => {
  try {
    const token = Cookies.get("access_token");
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
  } catch (error) {
    console.error("Invalid token format or decoding error", error);
  }
  return undefined;
};
