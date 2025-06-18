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
import { useSearchParams } from "next/navigation";

const ResetPasswordSchema = z.object({
  token: z.string({ required_error: "Token tidak ditemukan" }),
  new_password: z
    .string({ required_error: "Password baru wajib diisi" })
    .min(6, "Password minimal 6 karakter"),
});

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token || "",
      new_password: "",
    },
  });

  const { mutate: submit, isPending } = usePostData({
    queryKey: "reset-password",
    dataProtected: "auth/reset-password",
    successMessage: "Password berhasil diperbarui. Silakan login kembali.",
    backUrl: "/sign-in",
  });

  const onSubmit = (values: ResetPasswordFormData) => {
    submit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Silakan masukkan password baru Anda. Pastikan password mudah diingat
            namun tetap aman.
          </p>
        </div>

        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                  autoComplete="new-password"
                />
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
              Memperbarui...
            </>
          ) : (
            "Perbarui Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
