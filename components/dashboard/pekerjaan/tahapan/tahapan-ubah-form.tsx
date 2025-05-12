"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePatchData } from "@/hooks/use-patch-data";
import {
  RecruitmentStageUpdateFormData,
  RecruitmentStageUpdateSchema,
} from "@/schema/recruitment-stage-update-schema";

const TahapanUbahForm = ({
  jobId,
  applicationId,
  stageId,
}: {
  jobId: string;
  applicationId: string;
  stageId: string;
}) => {
  const form = useForm<RecruitmentStageUpdateFormData>({
    resolver: zodResolver(RecruitmentStageUpdateSchema),
    defaultValues: {
      stage_type: "CV_SCREENING",
      final_status: "PENDING",
      notes: "",
    },
  });

  const { mutate, isPending } = usePatchData({
    queryKey: "applications-by-job",
    dataProtected: `applications/${applicationId}/stages/${stageId}`,
    successMessage: "Tahapan berhasil diperbarui",
    backUrl: `/dashboard/pekerjaan/${jobId}`,
  });

  const onSubmit = (values: RecruitmentStageUpdateFormData) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Ubah Tahapan Rekrutmen</CardTitle>
            <CardDescription>
              Form ini digunakan untuk mengubah jenis tahapan, status akhir, dan
              catatan rekrutmen.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="stage_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Tahapan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Tahapan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CV_SCREENING">CV Screening</SelectItem>
                      <SelectItem value="HR_INTERVIEW">Interview HR</SelectItem>
                      <SelectItem value="MANAGEMENT_INTERVIEW">
                        Interview Management
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="final_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Akhir</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Menunggu</SelectItem>
                      <SelectItem value="ACCEPTED">Diterima</SelectItem>
                      <SelectItem value="REJECTED">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tulis catatan perubahan..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white"
            >
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default TahapanUbahForm;
