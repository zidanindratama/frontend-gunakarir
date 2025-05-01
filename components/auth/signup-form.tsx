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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SignUpSchema } from "@/schema/signup-schema";
import axiosInstance, { PROD_URL } from "@/helpers/axios-instance";
import Cookies from "js-cookie";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi2";

export function SignupForm({
  className,
}: React.ComponentPropsWithoutRef<"form">) {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "STUDENT",
      password: "",
      confirm_password: "",
    },
  });

  const role = form.watch("role");
  console.log(role === "RECRUITER");

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    setIsPending(true);
    toast("Memproses permintaan...", {
      description: "Silakan tunggu sebentar.",
    });
    try {
      const response = await axiosInstance.post("/auth/signup", values, {
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
            error?.response?.data?.message ||
            "Terjadi kesalahan saat register.",
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
          <h1 className="text-2xl font-bold">Daftar Akun Baru</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Masukkan email kamu untuk membuat akun baru
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div>
                          <RadioGroupItem
                            value="STUDENT"
                            id="mahasiswa"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="mahasiswa"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <HiOutlineUserGroup className="mb-3 h-6 w-6" />
                            Mahasiswa
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem
                            value="RECRUITER"
                            id="rekruter"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="rekruter"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <HiOutlineUser className="mb-3 h-6 w-6" />
                            Rekruter
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Pilih peran kamu untuk melanjutkan pendaftaran.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="zidanindratama" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nama ini akan digunakan sebagai identitas publik kamu.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata Sandi</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>Gunakan minimal 6 karakter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Kata Sandi</FormLabel>
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
              "Daftar"
            )}
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              atau daftar dengan
            </span>
          </div>
          {role === "STUDENT" && (
            <Button type="button" variant="outline" className="w-full" asChild>
              <Link href={`${PROD_URL}/auth/google`}>
                <FaGoogle />
                Daftar dengan Google
              </Link>
            </Button>
          )}
        </div>
        <div className="text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/sign-in" className="underline underline-offset-4">
            Masuk di sini
          </Link>
        </div>
      </form>
    </Form>
  );
}
