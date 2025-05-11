"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  AdminReviewFormData,
  AdminReviewSchema,
} from "@/schema/admin-review-schema";
import { useGetData } from "@/hooks/use-get-data";
import DataRow from "@/components/ui/data-row";
import { useWilayah } from "@/hooks/useWilayah";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePatchData } from "@/hooks/use-patch-data";
import { Badge } from "@/components/ui/badge";
import { TRecruiter } from "@/types/recruiter-type";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Props = {
  recruiterId: string;
};

const RecruiterReviewForm = ({ recruiterId }: Props) => {
  const { data: recruiterData } = useGetData({
    queryKey: ["recruiter-detail"],
    dataProtected: `recruiters/${recruiterId}`,
  });
  const recruiter: TRecruiter = recruiterData?.data;

  const { provinceOptions, cityOptions, districtOptions, villageOptions } =
    useWilayah({
      provinceId: recruiter?.province_id,
      cityId: recruiter?.city_id,
      districtId: recruiter?.district_id,
    });

  const provinceName =
    provinceOptions.find((prov) => prov.id === recruiter?.province_id)?.name ||
    "-";
  const cityName =
    cityOptions.find((city) => city.id === recruiter?.city_id)?.name || "-";
  const districtName =
    districtOptions.find((dist) => dist.id === recruiter?.district_id)?.name ||
    "-";
  const villageName =
    villageOptions.find((vill) => vill.id === recruiter?.village_id)?.name ||
    "-";

  const form = useForm<AdminReviewFormData>({
    resolver: zodResolver(AdminReviewSchema),
    defaultValues: {
      status: undefined,
      rejection_reason: "",
    },
  });

  const status = form.watch("status");

  const patchReview = usePatchData({
    queryKey: "recruiter-detail",
    dataProtected: `recruiters/review/${recruiterId}`,
    successMessage: "Status verifikasi berhasil dikirim!",
    backUrl: "/dashboard/rekruter",
  });

  const onSubmitReview = (data: AdminReviewFormData) => {
    patchReview.mutate(data);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Informasi Rekruter</CardTitle>
          <CardDescription>
            Detail terkait rekruter yang akan diverifikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 aspect-square">
              <AvatarImage
                src={recruiter?.user.image_url}
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="text-xl">GN</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                {recruiter?.user.username}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300">
                {recruiter?.user.email}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm border border-border divide-x divide-y rounded overflow-hidden">
            <DataRow label="Nama Perusahaan">{recruiter?.company_name}</DataRow>
            <DataRow label="Telepon">{recruiter?.phone_number}</DataRow>
            <DataRow label="NPWP">{recruiter?.NPWP}</DataRow>
            <DataRow label="Status">
              <Badge
                className={
                  recruiter?.status === "APPROVED"
                    ? "text-green-500 border-green-500"
                    : recruiter?.status === "REJECTED"
                    ? "text-red-500 border-red-500"
                    : "text-yellow-500 border-yellow-500"
                }
                variant="outline"
              >
                {recruiter?.status}
              </Badge>
            </DataRow>
            <DataRow label="Provinsi">{provinceName}</DataRow>
            <DataRow label="Kota/Kabupaten">{cityName}</DataRow>
            <DataRow label="Kecamatan">{districtName}</DataRow>
            <DataRow label="Kelurahan">{villageName}</DataRow>
            <DataRow label="Instagram">
              {recruiter?.instagram_url || "-"}
            </DataRow>
            <DataRow label="LinkedIn">{recruiter?.linkedin_url || "-"}</DataRow>
            <DataRow label="Proposal Kerja Sama" className="md:col-span-2">
              {recruiter?.contract_file ? (
                <Link
                  href={recruiter.contract_file}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat Proposal
                </Link>
              ) : (
                <span className="text-muted-foreground">Belum ada file</span>
              )}
            </DataRow>
            <DataRow label="Alamat" className="md:col-span-2">
              {recruiter?.address}
            </DataRow>
            <DataRow label="Deskripsi Perusahaan" className="md:col-span-2">
              {recruiter?.company_description}
            </DataRow>
          </div>
        </CardContent>
      </Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitReview)}>
          <Card>
            <CardHeader>
              <CardTitle>Verifikasi Rekruter</CardTitle>
              <CardDescription>
                Pilih status verifikasi dan berikan alasan jika ditolak.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {recruiter?.rejection_reason && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">
                  <strong>Alasan penolakan sebelumnya:</strong>
                  <p>{recruiter.rejection_reason}</p>
                </div>
              )}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status verifikasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="APPROVED">APPROVED</SelectItem>
                          <SelectItem value="REJECTED">REJECTED</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {status === "REJECTED" && (
                <FormField
                  control={form.control}
                  name="rejection_reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alasan Penolakan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tuliskan alasan kenapa rekruter ditolak"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="bg-blue-gunakarir dark:text-white"
              >
                Kirim Verifikasi
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default RecruiterReviewForm;
