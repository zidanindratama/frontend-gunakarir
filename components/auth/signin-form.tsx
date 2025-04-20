"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/schema/signin-schema";
import axiosInstance, { PROD_URL } from "@/helpers/axios-instance";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function SigninForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setIsPending(true);
    toast("Memproses permintaan...", {
      description: "Silakan tunggu sebentar.",
    });

    try {
      const response = await axiosInstance.post("/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Cookies.set("access_token", response.data.accessToken);
      toast("Berhasil masuk!", {
        description: "Selamat datang di GunaKarir.",
      });

      router.push(response.data.redirectUrl);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast("Gagal masuk!", {
          description:
            error?.response?.data?.message || "Terjadi kesalahan saat masuk.",
        });
      } else {
        toast("Terjadi kesalahan!", {
          description: "Terjadi kesalahan yang tidak terduga.",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Masuk ke Akun</h1>
          <p className="text-sm text-muted-foreground">
            Masukkan informasi kamu untuk login
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="zidan@email.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Kami akan mengirimkan informasi penting ke email ini.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-gunakarir dark:text-white"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              atau masuk dengan
            </span>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href={`${PROD_URL}/auth/google`}>
              <FaGoogle />
              Masuk dengan Google
            </Link>
          </Button>
        </div>
        <div className="text-center text-sm">
          Belum punya akun?{" "}
          <a href="/sign-up" className="underline underline-offset-4">
            Daftar di sini
          </a>
        </div>
      </form>
    </Form>
  );
}
