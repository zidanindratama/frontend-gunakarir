"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePostData } from "@/hooks/use-post-data";
import Link from "next/link";

const ForgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email wajib diisi" })
    .email("Format email tidak valid"),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: submit, isPending } = usePostData({
    queryKey: "forgot-password",
    dataProtected: "auth/forgot-password",
    successMessage: "Tautan reset password telah dikirim ke email Anda.",
  });

  const { mutate: resend, isPending: isResending } = usePostData({
    queryKey: "resend-reset-password",
    dataProtected: "auth/resend-reset-password",
    successMessage: "Tautan reset password berhasil dikirim ulang.",
  });

  const onSubmit = (values: ForgotPasswordFormData) => {
    submit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Lupa Kata Sandi</h1>
          <p className="text-sm text-muted-foreground">
            Silakan masukkan alamat email yang terdaftar. Kami akan mengirimkan
            tautan untuk melakukan pengaturan ulang kata sandi Anda.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="nama@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-gunakarir dark:text-white"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim"
          )}
        </Button>

        <Button type="button" className="w-full" variant={"outline"} asChild>
          <Link href={"/sign-up"}>Kembali</Link>
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Tidak menerima email?{" "}
          <button
            type="button"
            disabled={!form.getValues("email") || isResending}
            onClick={() => resend({ email: form.getValues("email") })}
            className="text-blue-500 hover:underline"
          >
            Kirim ulang tautan
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
