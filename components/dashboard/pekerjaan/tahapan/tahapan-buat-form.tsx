"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePostData } from "@/hooks/use-post-data";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { usePatchData } from "@/hooks/use-patch-data";
import { TApplication } from "@/types/application-type";
import { useGetData } from "@/hooks/use-get-data";
import {
  RecruitmentStageCreateFormData,
  RecruitmentStageCreateSchema,
} from "@/schema/recruitment-stage-create-schema";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";

const TahapanBuatForm = ({ applicationId }: { applicationId: string }) => {
  const { data: applicationData } = useGetData({
    queryKey: ["applicationData"],
    dataProtected: `applications/${applicationId}`,
  });

  const application: TApplication = applicationData?.data;
  const currentStage =
    application?.stages?.[application.stages.length - 1]?.stage_type;

  const form = useForm<RecruitmentStageCreateFormData>({
    resolver: zodResolver(RecruitmentStageCreateSchema),
    defaultValues: {
      final_status: "ACCEPTED",
      is_same_location: false,
      confirm_deadline: undefined,
      schedule: undefined,
      stage_type: currentStage,
    },
  });

  const watchMethod = form.watch("method");
  const watchSameLocation = form.watch("is_same_location");
  const watchFinalStatus = form.watch("final_status");

  const isAccepted = watchFinalStatus === "ACCEPTED";

  const showInterviewForm =
    (currentStage === "CV_SCREENING" && isAccepted) ||
    (currentStage === "HR_INTERVIEW" && isAccepted);

  const { mutate, isPending } = usePostData({
    queryKey: "applications-by-job",
    dataProtected: `applications/${applicationId}/stages`,
    successMessage: "Tahapan berhasil diperbarui",
  });

  const { mutate: updateApplicationStatus } = usePatchData({
    queryKey: "applications-by-job",
    dataProtected: `applications/${applicationId}`,
    successMessage: "Status lamaran berhasil diperbarui",
    backUrl: `/dashboard/pekerjaan/${application?.job?.id}`,
  });

  const onSubmit = (values: RecruitmentStageCreateFormData) => {
    let nextStage:
      | "CV_SCREENING"
      | "HR_INTERVIEW"
      | "MANAGEMENT_INTERVIEW"
      | undefined = currentStage;

    let finalStatus = values.final_status;

    const isAccepted = finalStatus === "ACCEPTED";

    if (currentStage === "CV_SCREENING" && isAccepted) {
      nextStage = "HR_INTERVIEW";
      finalStatus = "INTERVIEW_INVITED";
    } else if (currentStage === "HR_INTERVIEW" && isAccepted) {
      nextStage = "MANAGEMENT_INTERVIEW";
      finalStatus = "INTERVIEW_INVITED";
    } else if (!isAccepted) {
      nextStage = currentStage;
    }

    const payload = {
      stage: {
        stage_type: nextStage,
        notes: values.notes,
      },
      interview: showInterviewForm
        ? {
            schedule: values.schedule,
            confirm_deadline: values.confirm_deadline,
            method: values.method,
            link: values.method === "ONLINE" ? values.link : undefined,
            location:
              values.method === "OFFLINE"
                ? values.is_same_location
                  ? application.job?.recruiter.address
                  : values.location
                : undefined,
            notes: values.notes,
          }
        : undefined,
    };

    console.log(payload);

    mutate(payload, {
      onSuccess: () => {
        if (finalStatus) {
          updateApplicationStatus({ status: finalStatus });
        }
      },
    });
  };

  useEffect(() => {
    form.reset({
      final_status: "ACCEPTED",
      is_same_location: false,
      confirm_deadline: undefined,
      schedule: undefined,
      stage_type: currentStage,
    });
  }, [application]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Ubah Tahapan Rekrutmen</CardTitle>
            <CardDescription>
              Gunakan form ini untuk memperbarui tahapan proses seleksi
              kandidat.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="final_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Lamaran</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="REJECTED"
                          id="ditolak"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="ditolak"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 text-center text-muted-foreground hover:bg-accent hover:text-accent-foreground
              peer-data-[state=checked]:border-red-600
              peer-data-[state=checked]:text-red-600
              peer-data-[state=checked]:bg-red-100
              dark:peer-data-[state=checked]:border-red-500
              dark:peer-data-[state=checked]:text-red-400
              dark:peer-data-[state=checked]:bg-red-900"
                        >
                          <MdDoNotDisturbAlt className="w-5 h-5 mb-1" />
                          Tolak
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="ACCEPTED"
                          id="diterima"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="diterima"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 text-center text-muted-foreground hover:bg-accent hover:text-accent-foreground
              peer-data-[state=checked]:border-green-600
              peer-data-[state=checked]:text-green-600
              peer-data-[state=checked]:bg-green-100
              dark:peer-data-[state=checked]:border-green-500
              dark:peer-data-[state=checked]:text-green-400
              dark:peer-data-[state=checked]:bg-green-900"
                        >
                          <MdOutlineCheck className="w-5 h-5 mb-1" />
                          Lolos
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
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
                    <Textarea {...field} placeholder="Tulis catatan tambahan" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showInterviewForm && (
              <>
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel htmlFor="datetime">
                        Tanggal Wawancara
                      </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          placeholder="Pilih tanggal wawancara"
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
                  name="confirm_deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel htmlFor="datetime">Batas Konfirmasi</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          placeholder="Pilih tanggal batas konfirmasi"
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
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metode Interview</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Metode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ONLINE">Online</SelectItem>
                          <SelectItem value="OFFLINE">Offline</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {watchMethod === "ONLINE" && (
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Wawancara</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://meet.example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {watchMethod === "OFFLINE" && (
                  <>
                    <FormField
                      control={form.control}
                      name="is_same_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sama dengan alamat perusahaan?</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lokasi Interview</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={watchSameLocation}
                              placeholder="Jl. Sudirman No.123"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-blue-500" disabled={isPending}>
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default TahapanBuatForm;
