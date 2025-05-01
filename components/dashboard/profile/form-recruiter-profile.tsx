"use client";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useWilayah } from "@/hooks/useWilayah";
import { useFileUploader } from "@/hooks/use-file-uploader";
import { usePostData } from "@/hooks/use-post-data";
import { SelectWilayah } from "@/components/ui/select-wilayah";
import {
  RecruiterRequestFormData,
  RecruiterRequestSchema,
} from "@/schema/recruiter-request-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import { usePostOrPatchRecruiter } from "@/hooks/use-post-or-patch-recruiter";
import { usePatchData } from "@/hooks/use-patch-data";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const FormRecruiterProfile = () => {
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [pendingRecruiterData, setPendingRecruiterData] =
    useState<RecruiterRequestFormData | null>(null);

  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });
  const user: TUser = userData?.data;

  const preloadValues: RecruiterRequestFormData = user?.recruiter
    ? {
        NPWP: user.recruiter.NPWP || "",
        company_name: user.recruiter.company_name || "",
        company_logo: user.recruiter.company_logo || "",
        company_description: user.recruiter.company_description || "",
        contract_file: user.recruiter.contract_file || "",
        address: user.recruiter.address || "",
        phone_number: user.recruiter.phone_number || "",
        linkedin_url: user.recruiter.linkedin_url || undefined,
        instagram_url: user.recruiter.instagram_url || undefined,
        province_id: user.recruiter.province_id || "",
        city_id: user.recruiter.city_id || "",
        district_id: user.recruiter.district_id || "",
        village_id: user.recruiter.village_id || "",
        status: user.recruiter.status || "PENDING",
      }
    : {
        NPWP: "",
        company_name: "",
        company_logo: "",
        company_description: "",
        contract_file: "",
        address: "",
        phone_number: "",
        linkedin_url: "",
        instagram_url: "",
        province_id: "",
        city_id: "",
        district_id: "",
        village_id: "",
        status: "PENDING",
      };

  const form = useForm<RecruiterRequestFormData>({
    resolver: zodResolver(RecruiterRequestSchema),
    defaultValues: preloadValues,
  });

  const { uploadFile } = useFileUploader();

  const { submit } = usePostOrPatchRecruiter(user);

  const { mutate: postRecruiterOTPRequest } = usePostData({
    queryKey: "user-me",
    dataProtected: "recruiters/update-otp-request",
  });

  const { mutate: updateRecruiterWithOtp } = usePatchData({
    queryKey: "user-me",
    dataProtected: "recruiters/update-approved",
    successMessage: "Profil berhasil diperbarui",
    backUrl: "/dashboard",
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "pdf" | "image",
    field: keyof RecruiterRequestFormData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file, type);
    form.setValue(field, url || "", { shouldValidate: true });
  };

  const wilayah = useWilayah({
    provinceId: form.watch("province_id"),
    cityId: form.watch("city_id"),
    districtId: form.watch("district_id"),
  });

  const onSubmit = async (values: RecruiterRequestFormData) => {
    const finalValues = form.getValues();

    if (!user?.recruiter) {
      // createRequest
      submit(finalValues);
    } else if (user.recruiter.status === "REJECTED") {
      // appealRequest
      submit(finalValues);
    } else if (user.recruiter.status === "PENDING") {
      // updatePendingRecruiter
      submit(finalValues);
    } else if (user.recruiter.status === "APPROVED") {
      // updateApprovedRecruiter → pakai OTP
      postRecruiterOTPRequest({});
      setPendingRecruiterData(finalValues);
      setShowOtpDialog(true);
    } else {
      console.warn("Status tidak dikenali. Tidak ada aksi dijalankan.");
    }
  };

  const handleOtpSubmit = (otp: string) => {
    if (!pendingRecruiterData) return;
    updateRecruiterWithOtp({
      otp,
      data: pendingRecruiterData,
    });
    setShowOtpDialog(false);
  };

  useEffect(() => {
    if (user?.recruiter) {
      form.reset(preloadValues);
    }
  }, [user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profil Rekruter</CardTitle>
            <CardDescription>
              Isi data perusahaan Anda dengan lengkap.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="NPWP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPWP</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor NPWP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
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
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Nomor Telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="company_logo"
              render={() => (
                <FormItem>
                  <FormLabel>Logo Perusahaan</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(e, "image", "company_logo")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contract_file"
              render={() => (
                <FormItem>
                  <FormLabel className="flex flex-col md:flex-row items-start md:items-center gap-2">
                    Proposal Kerja Sama
                    <Link
                      href="/contoh-proposal-kerjasama.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 underline hover:text-blue-800"
                    >
                      (Download Proposal Kerja Sama)
                    </Link>
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        handleFileChange(e, "pdf", "contract_file")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <SelectWilayah
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      form.setValue("city_id", "");
                      form.setValue("district_id", "");
                      form.setValue("village_id", "");
                      wilayah.fetchCities(val);
                    }}
                    placeholder="Pilih Provinsi"
                    options={wilayah.provinceOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kota/Kabupaten</FormLabel>
                  <SelectWilayah
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      form.setValue("district_id", "");
                      form.setValue("village_id", "");
                      wilayah.fetchDistricts(val);
                    }}
                    placeholder="Pilih Kota"
                    options={wilayah.cityOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kecamatan</FormLabel>
                  <SelectWilayah
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      form.setValue("village_id", "");
                      wilayah.fetchVillages(val);
                    }}
                    placeholder="Pilih Kecamatan"
                    options={wilayah.districtOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="village_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelurahan</FormLabel>
                  <SelectWilayah
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Pilih Kelurahan"
                    options={wilayah.villageOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input placeholder="Alamat lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="company_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Perusahaan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi perusahaan"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="linkedin_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/company/xxx"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Opsional</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/xxx" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Opsional</FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-fit bg-blue-500">
              Ajukan Profil
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifikasi OTP</DialogTitle>
            <DialogDescription>
              Kode OTP telah dikirim ke email Anda.
            </DialogDescription>
          </DialogHeader>
          <InputOTP
            maxLength={6}
            onChange={(val) => val.length === 6 && handleOtpSubmit(val)}
            className="w-full"
          >
            <InputOTPGroup className="w-full grid grid-cols-6 gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="w-full text-center"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default FormRecruiterProfile;
