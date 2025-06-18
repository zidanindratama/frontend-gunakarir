"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MailIcon, MapPinIcon, PhoneIcon, Instagram } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Nama depan wajib diisi." }),
  lastName: z.string().min(1, { message: "Nama belakang wajib diisi." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }),
});

type FormData = z.infer<typeof formSchema>;

const FormBantuan = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const { firstName, lastName, email, message } = data;
    const mailto = `https://mail.google.com/mail/?view=cm&fs=1&to=zidanindratama03@gmail.com&su=Pesan dari ${firstName} ${lastName}&body=Nama: ${firstName} ${lastName}%0AEmail: ${email}%0APesan:%0A${encodeURIComponent(
      message
    )}`;
    window.open(mailto, "_blank");
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-5xl mx-auto px-4">
        <b className="text-muted-foreground">Hubungi Kami</b>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
          Pusat Bantuan dan Informasi
        </h2>
        <p className="mt-3 text-base sm:text-lg">
          Jika Anda memiliki pertanyaan, saran, atau membutuhkan bantuan lebih
          lanjut, silakan isi formulir berikut atau hubungi kami melalui
          Instagram.
        </p>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10 items-center">
          {/* Kontak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Email</h3>
              <p className="my-2.5 text-muted-foreground">
                Tim kami siap membantu melalui email.
              </p>
              <Link
                className="font-medium text-primary"
                href="mailto:zidanindratama03@gmail.com"
              >
                zidanindratama03@gmail.com
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <Instagram />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Instagram</h3>
              <p className="my-2.5 text-muted-foreground">
                Kirim pesan ke kami melalui Instagram.
              </p>
              <Link
                className="font-medium text-primary"
                href="https://instagram.com/zidanindratama"
                target="_blank"
              >
                @zidanindratama
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <MapPinIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Kantor</h3>
              <p className="my-2.5 text-muted-foreground">
                Datang langsung ke kantor kami.
              </p>
              <Link
                className="font-medium text-primary"
                href="https://map.google.com"
                target="_blank"
              >
                Jl. Margonda Raya No. 100, Pondok Cina, Kecamatan Beji, Kota
                Depok, Jawa Barat
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <PhoneIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Telepon</h3>
              <p className="my-2.5 text-muted-foreground">
                Senin - Jumat, pukul 08.00 - 17.00.
              </p>
              <Link
                className="font-medium text-primary"
                href="tel:(+62) 877-1404-4760"
              >
                (+62) 877-1404-4760
              </Link>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-accent shadow-none h-fit">
            <CardContent className="p-6 md:p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Depan</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama depan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Belakang</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama belakang" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Alamat email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tulis pesan Anda di sini..."
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-500">
                    Kirim Pesan
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormBantuan;
