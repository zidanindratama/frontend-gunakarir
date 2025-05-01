"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
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
  WorkExperienceFormData,
  WorkExperienceSchema,
} from "@/schema/work-experience-schema";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { useEffect } from "react";

export default function WorkExperienceFormDialog({
  open,
  onClose,
  onSave,
  defaultValue,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: WorkExperienceFormData) => void;
  defaultValue?: WorkExperienceFormData;
}) {
  const form = useForm<WorkExperienceFormData>({
    resolver: zodResolver(WorkExperienceSchema),
    defaultValues: defaultValue ?? {
      company_name: "",
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
      company_name: defaultValue?.company_name ?? "",
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

  function handleSubmit(values: WorkExperienceFormData) {
    onSave(values);
    onClose();
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValue ? "Ubah Pengalaman Kerja" : "Tambah Pengalaman Kerja"}
          </DialogTitle>
          <DialogDescription>
            {defaultValue
              ? "Perbarui pengalaman kerja kamu."
              : "Isi pengalaman kerja kamu."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Perusahaan</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Perusahaan" {...field} />
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
            <DatePickerField
              control={form.control}
              name="start_date"
              label="Tanggal Mulai"
              disabledBefore1900
              disableFuture
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
                    Masih bekerja di sini
                  </FormLabel>
                </FormItem>
              )}
            />
            <DatePickerField
              control={form.control}
              name="end_date"
              label="Tanggal Selesai"
              disabledBefore1900
              disabled={form.watch("ongoing")}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsikan tanggung jawab atau pencapaian"
                      {...field}
                    />
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
