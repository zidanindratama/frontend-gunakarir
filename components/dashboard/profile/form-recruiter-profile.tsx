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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        username: user.username ?? "",
        image_url: user.image_url ?? "",
        NPWP: user.recruiter.NPWP ?? "",
        company_name: user.recruiter.company_name ?? "",
        company_logo: user.recruiter.company_logo ?? "",
        company_description: user.recruiter.company_description ?? "",
        contract_file: user.recruiter.contract_file ?? "",
        address: user.recruiter.address ?? "",
        phone_number: user.recruiter.phone_number ?? "",
        linkedin_url: user.recruiter.linkedin_url ?? "",
        instagram_url: user.recruiter.instagram_url ?? "",
        province_id: user.recruiter.province_id ?? "",
        city_id: user.recruiter.city_id ?? "",
        district_id: user.recruiter.district_id ?? "",
        village_id: user.recruiter.village_id ?? "",
        status: user.recruiter.status || "PENDING",
      }
    : {
        username: user?.username,
        image_url: user?.image_url,
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
    values: preloadValues,
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
    successMessage: "Profil berhasil diperbarui!",
    backUrl: "/dashboard/profile",
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

  const onSubmit = async () => {
    const finalValues = form.getValues();

    if (user?.recruiter?.status === "APPROVED") {
      postRecruiterOTPRequest({});
      setPendingRecruiterData(finalValues);
      setShowOtpDialog(true);
      return;
    }

    submit(finalValues);
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
            <CardTitle>Proposal Kerja Sama</CardTitle>
            <CardDescription>
              Unggah file proposal kerja sama perusahaan Anda dalam format PDF.
            </CardDescription>
            <Link
              href="/contoh-proposal-kerjasama.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 underline hover:text-blue-800 mt-1"
            >
              (Download Proposal Kerja Sama)
            </Link>
          </CardHeader>
          <CardContent className="">
            <FormField
              control={form.control}
              name="contract_file"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Proposal Kerja Sama
                    {preloadValues.contract_file && (
                      <Link
                        href={preloadValues.contract_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 underline hover:text-blue-800"
                      >
                        (Lihat Proposal)
                      </Link>
                    )}
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
          </CardContent>
        </Card>
        <Card>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <CardContent className="">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 aspect-square">
                    <AvatarImage
                      src={user?.image_url}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="text-xl">GN</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                      {user?.username}
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {user?.email}
                    </p>
                    <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="image_url"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(e, "image", "image_url")
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
            <div className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Informasi Perusahaan</CardTitle>
                <CardDescription>
                  Lengkapi profil perusahaan Anda untuk keperluan verifikasi
                  akun rekruter.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid  gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>Opsional</FormDescription>
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="company_logo"
                  render={() => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Logo Perusahaan
                        {preloadValues.company_logo && (
                          <Link
                            href={preloadValues.company_logo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 underline hover:text-blue-800"
                          >
                            (Lihat Logo)
                          </Link>
                        )}
                      </FormLabel>
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
              </CardContent>
            </div>
            <div className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Alamat Perusahaan</CardTitle>
                <CardDescription>
                  Masukkan alamat lengkap perusahaan sesuai lokasi operasional.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          <Textarea
                            placeholder="Alamat lengkap"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </div>
            <div className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Sosial Media Perusahaan</CardTitle>
                <CardDescription>
                  Cantumkan akun media sosial resmi perusahaan.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Input
                          placeholder="https://instagram.com/xxx"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>Opsional</FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
          </div>
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
