"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  OrganizationalExperienceFormData,
  OrganizationalExperienceSchema,
} from "@/schema/organizational-experience-schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export default function OrganizationalExperienceFormDialog({
  open,
  onClose,
  onSave,
  defaultValue,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: OrganizationalExperienceFormData) => void;
  defaultValue?: OrganizationalExperienceFormData;
}) {
  const form = useForm<OrganizationalExperienceFormData>({
    resolver: zodResolver(OrganizationalExperienceSchema),
    defaultValues: defaultValue ?? {
      organization_name: "",
      position: "",
      start_date: undefined,
      end_date: undefined,
      ongoing: false,
      description: "",
    },
  });

  useEffect(() => {
    const isOngoing = defaultValue?.end_date === undefined;
    form.reset({
      organization_name: defaultValue?.organization_name ?? "",
      position: defaultValue?.position ?? "",
      start_date: defaultValue?.start_date
        ? new Date(defaultValue.start_date)
        : undefined,
      end_date: defaultValue?.end_date
        ? new Date(defaultValue.end_date)
        : undefined,
      ongoing: isOngoing,
      description: defaultValue?.description ?? "",
    });
  }, [defaultValue, open]);

  function handleSubmit(values: OrganizationalExperienceFormData) {
    onSave(values);
    onClose();
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValue
              ? "Ubah Pengalaman Organisasi"
              : "Tambah Pengalaman Organisasi"}
          </DialogTitle>
          <DialogDescription>
            {defaultValue
              ? "Perbarui pengalaman organisasi kamu."
              : "Isi pengalaman organisasi kamu."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="organization_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Organisasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Organisasi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posisi</FormLabel>
                  <FormControl>
                    <Input placeholder="Posisi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="datetime">Tanggal Mulai</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      placeholder="Pilih tanggal mulai"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ongoing"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) form.setValue("end_date", undefined);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Masih aktif di organisasi ini
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="datetime">Tanggal Selesai</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      placeholder="Pilih tanggal akhir"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={form.watch("ongoing")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ceritakan pengalamanmu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Simpan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
