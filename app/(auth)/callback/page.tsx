"use client";

import axiosInstance from "@/helpers/axios-instance";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const refreshRes = await axiosInstance.post("/auth/refresh");
        const { accessToken } = refreshRes.data;

        Cookies.set("access_token", accessToken);

        router.replace("/");
      } catch (err) {
        console.error("Gagal autentikasi:", err);
        router.replace("/sign-in");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center px-4">
      <Loader2 className="h-10 w-10 animate-spin text-blue-gunakarir" />
      <div>
        <h1 className="text-xl font-semibold capitalize">
          Sedang memproses autentikasi...
        </h1>
        <p className="text-sm text-muted-foreground">
          Mohon tunggu sebentar. Kamu akan segera diarahkan ke halaman utama.
        </p>
      </div>
    </div>
  );
}
