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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "@/components/ui/date-time-picker";

import { usePatchData } from "@/hooks/use-patch-data";
import { useGetData } from "@/hooks/use-get-data";
import {
  RecruitmentStageUpdateFormData,
  RecruitmentStageUpdateSchema,
} from "@/schema/recruitment-stage-update-schema";
import { TApplication } from "@/types/application-type";
import { useEffect } from "react";

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
      repeat_interview: false,
      is_same_location: false,
    },
  });

  const { data: applicationData } = useGetData({
    queryKey: ["application", applicationId],
    dataProtected: `applications/${applicationId}`,
  });

  const application: TApplication = applicationData?.data;
  const currentStageType = application?.stages[0]?.stage_type;

  const watchStage = form.watch("stage_type");
  const watchRepeatInterview = form.watch("repeat_interview");
  const watchMethod = form.watch("method");
  const watchSameLocation = form.watch("is_same_location");

  const getAllowedStageTypes = () => {
    if (currentStageType === "MANAGEMENT_INTERVIEW") {
      return ["CV_SCREENING", "HR_INTERVIEW"];
    } else if (currentStageType === "HR_INTERVIEW") {
      return ["CV_SCREENING"];
    }
    return ["CV_SCREENING", "HR_INTERVIEW", "MANAGEMENT_INTERVIEW"];
  };

  const { mutate, isPending } = usePatchData({
    queryKey: "applications-by-job",
    dataProtected: `applications/${applicationId}/stages/${stageId}`,
    successMessage: "Tahapan berhasil diperbarui",
    backUrl: `/dashboard/pekerjaan/${jobId}`,
  });

  const onSubmit = (values: RecruitmentStageUpdateFormData) => {
    const safeFinalStatus =
      values.final_status ??
      (values.repeat_interview ? "INTERVIEW_INVITED" : "PENDING");

    const interview =
      values.repeat_interview && values.stage_type !== "CV_SCREENING"
        ? {
            schedule: values.schedule,
            confirm_deadline: values.confirm_deadline,
            method: values.method,
            link: values.method === "ONLINE" ? values.link : undefined,
            location:
              values.method === "OFFLINE"
                ? values.is_same_location
                  ? undefined
                  : values.location
                : undefined,
            notes: values.notes,
          }
        : undefined;

    mutate({ ...values, final_status: safeFinalStatus, interview });
  };

  useEffect(() => {
    const currentStatus = form.getValues("final_status");

    if (watchRepeatInterview && currentStatus !== "INTERVIEW_INVITED") {
      form.setValue("final_status", "INTERVIEW_INVITED");
    }

    if (!watchRepeatInterview && !currentStatus) {
      form.setValue("final_status", "PENDING");
    }
  }, [watchRepeatInterview, form]);

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
            {/* Jenis Tahapan */}
            <FormField
              control={form.control}
              name="stage_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Tahapan</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "CV_SCREENING") {
                        form.setValue("repeat_interview", false);
                        form.setValue("schedule", undefined);
                        form.setValue("confirm_deadline", undefined);
                        form.setValue("method", undefined);
                        form.setValue("link", "");
                        form.setValue("location", "");
                        form.setValue("is_same_location", false);
                        form.setValue("final_status", "PENDING");
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {field.value
                            ? {
                                CV_SCREENING: "CV Screening",
                                HR_INTERVIEW: "Interview HR",
                                MANAGEMENT_INTERVIEW: "Interview Management",
                              }[field.value]
                            : "Pilih Tahapan"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getAllowedStageTypes().map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace("_", " ").toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Akhir */}
            <FormField
              control={form.control}
              name="final_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Akhir</FormLabel>
                  <Select
                    disabled={watchRepeatInterview}
                    onValueChange={field.onChange}
                    value={field.value ?? "PENDING"}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {field.value
                            ? {
                                PENDING: "Menunggu",
                                ACCEPTED: "Diterima",
                                REJECTED: "Ditolak",
                                INTERVIEW_INVITED: "Interview Diundang",
                              }[field.value]
                            : "Pilih Status"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!watchRepeatInterview && (
                        <>
                          <SelectItem value="PENDING">Menunggu</SelectItem>
                          <SelectItem value="ACCEPTED">Diterima</SelectItem>
                          <SelectItem value="REJECTED">Ditolak</SelectItem>
                        </>
                      )}
                      {watchRepeatInterview && (
                        <SelectItem value="INTERVIEW_INVITED">
                          Interview Diundang
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Catatan */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Tulis catatan..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interview ulang */}
            {watchStage !== "CV_SCREENING" && (
              <>
                <FormField
                  control={form.control}
                  name="repeat_interview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interview Ulang?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked) {
                              form.setValue(
                                "final_status",
                                "INTERVIEW_INVITED"
                              );
                            } else {
                              form.setValue("schedule", undefined);
                              form.setValue("confirm_deadline", undefined);
                              form.setValue("method", undefined);
                              form.setValue("link", "");
                              form.setValue("location", "");
                              form.setValue("is_same_location", false);
                              form.setValue("final_status", "PENDING");
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchRepeatInterview && (
                  <>
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Interview</FormLabel>
                          <FormControl>
                            <DateTimePicker
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
                        <FormItem>
                          <FormLabel>Batas Konfirmasi</FormLabel>
                          <FormControl>
                            <DateTimePicker
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
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    {
                                      ONLINE: "Online",
                                      OFFLINE: "Offline",
                                    }[field.value as "ONLINE" | "OFFLINE"] ??
                                    "Pilih Metode"
                                  }
                                />
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
                              <FormLabel>
                                Sama dengan alamat perusahaan?
                              </FormLabel>
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
                                  placeholder="Jl. Sudirman No.123"
                                  disabled={watchSameLocation}
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
              </>
            )}
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
