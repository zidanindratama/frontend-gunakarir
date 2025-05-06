"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetData } from "@/hooks/use-get-data";
import { usePostData } from "@/hooks/use-post-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { TUser } from "@/types/user-type";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  StudentProfileUpdateFormData,
  StudentProfileUpdateSchema,
} from "@/schema/student-profile-update-schema";
import { Textarea } from "@/components/ui/textarea";
import { useFileUploader } from "@/hooks/use-file-uploader";
import { useWilayah } from "@/hooks/useWilayah";
import { EducationFormData } from "@/schema/education-schema";
import EducationFormDialog from "./form-education";
import ListEducation from "./list-education";
import ListWorkExperience, { WorkExperience } from "./list-work-experience";
import { WorkExperienceFormData } from "@/schema/work-experience-schema";
import WorkExperienceFormDialog from "./form-work-experience";
import { OrganizationalExperienceFormData } from "@/schema/organizational-experience-schema";
import ListOrganizationalExperience from "./list-organizational-experience";
import OrganizationalExperienceFormDialog from "./form-organizationnal-experience";
import Link from "next/link";
import { SelectWilayahField } from "@/components/ui/select-wilayah-field";

const FormUbahProfile = () => {
  const { uploadFile } = useFileUploader();

  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });
  const user: TUser = userData?.data;

  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [pendingProfileData, setPendingProfileData] = useState<z.infer<
    typeof StudentProfileUpdateSchema
  > | null>(null);

  const [showEducationDialog, setShowEducationDialog] = useState(false);
  const [localEducations, setLocalEducations] = useState<EducationFormData[]>(
    []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [educationFormData, setEducationFormData] = useState<
    EducationFormData | undefined
  >(undefined);

  const [showWorkDialog, setShowWorkDialog] = useState(false);
  const [localWorkExperiences, setLocalWorkExperiences] = useState<
    WorkExperience[]
  >([]);
  const [editingWorkIndex, setEditingWorkIndex] = useState<number | null>(null);
  const [workFormData, setWorkFormData] = useState<
    WorkExperienceFormData | undefined
  >(undefined);

  const [showOrgDialog, setShowOrgDialog] = useState(false);
  const [localOrgExperiences, setLocalOrgExperiences] = useState<
    OrganizationalExperienceFormData[]
  >([]);
  const [editingOrgIndex, setEditingOrgIndex] = useState<number | null>(null);
  const [orgFormData, setOrgFormData] = useState<
    OrganizationalExperienceFormData | undefined
  >(undefined);

  const preloadValues: StudentProfileUpdateFormData = user?.student
    ? {
        username: user.username ?? "",
        image_url: user.image_url ?? "",
        NPM: user.student.NPM ?? "",
        fullname: user.student.fullname ?? "",
        address: user.student.address ?? "",
        phone_number: user.student.phone_number ?? "",
        bio: user.student.bio ?? "",
        gender: user.student.gender || "MALE",
        CV_file: user.student.CV_file ?? "",
        KTM_file: user.student.KTM_file ?? "",
        linkedin_url: user.student.linkedin_url ?? "",
        instagram_url: user.student.instagram_url ?? "",
        province_id: user.student.province_id ?? "",
        city_id: user.student.city_id ?? "",
        district_id: user.student.district_id ?? "",
        village_id: user.student.village_id ?? "",
      }
    : {
        username: "",
        image_url: "",
        NPM: "",
        fullname: "",
        address: "",
        phone_number: "",
        bio: "",
        gender: "MALE",
        CV_file: "",
        KTM_file: "",
        linkedin_url: "",
        instagram_url: "",
        province_id: "",
        city_id: "",
        district_id: "",
        village_id: "",
      };

  const form = useForm<StudentProfileUpdateFormData>({
    resolver: zodResolver(StudentProfileUpdateSchema),
    values: preloadValues,
  });

  const {
    provinceOptions,
    cityOptions,
    districtOptions,
    villageOptions,
    fetchCities,
    fetchDistricts,
    fetchVillages,
  } = useWilayah({
    provinceId: form.watch("province_id"),
    cityId: form.watch("city_id"),
    districtId: form.watch("district_id"),
  });

  const { mutate: postOTPRequest } = usePostData({
    queryKey: "user-me",
    dataProtected: "students/update-otp-request",
  });

  const { mutate: updateProfile } = usePatchData({
    queryKey: "user-me",
    dataProtected: "students/update-my-profile",
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "pdf" | "image",
    fieldName: keyof StudentProfileUpdateFormData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadFile(file, type);

    if (url) {
      form.setValue(fieldName, url, { shouldValidate: true });
    } else {
      form.setValue(fieldName, "", { shouldValidate: true });
    }
  };

  const onSubmit = async (values: StudentProfileUpdateFormData) => {
    const finalValues = form.getValues();

    postOTPRequest({});
    setPendingProfileData({
      ...values,
      CV_file: finalValues.CV_file,
      KTM_file: finalValues.KTM_file,
    });
    setShowOtpDialog(true);
  };

  const handleOtpSubmit = (otp: string) => {
    updateProfile({
      otp,
      data: {
        ...pendingProfileData,
        educations: localEducations,
        workExperiences: localWorkExperiences,
        organizationalExperiences: localOrgExperiences,
      },
    });

    setShowOtpDialog(false);
  };

  useEffect(() => {
    if (user?.student) {
      form.reset(preloadValues);
    }
  }, [user]);

  useEffect(() => {
    if (user?.student?.educations) {
      setLocalEducations(
        user.student.educations.map((edu) => ({
          degree: edu.degree,
          university: edu.university,
          faculty: edu.faculty,
          major: edu.major,
          gpa: edu.gpa,
          start_year: edu.start_year,
          end_year: edu.end_year ?? undefined,
          description: edu.description,
          ongoing: edu.end_year === null,
        }))
      );
    }
    if (user?.student?.workExperiences) {
      setLocalWorkExperiences(
        user.student.workExperiences.map((exp) => ({
          company_name: exp.company_name,
          position: exp.position,
          start_date: new Date(exp.start_date),
          end_date: exp.end_date ? new Date(exp.end_date) : undefined,
          description: exp.description ?? "",
          ongoing: !exp.end_date,
        }))
      );
    }
  }, [user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="w-full bg-white dark:bg-neutral-950 z-1 relative">
          <div className="container mx-auto px-4 py-36 md:px-10">
            <div className="bg-white dark:bg-neutral-900 border p-8 rounded-lg shadow-sm">
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
              <div className="flex flex-col gap-6 mt-10">
                <h1 className="text-xl font-semibold">Informasi Profil</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
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
                  </div>
                  <FormField
                    control={form.control}
                    name="NPM"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NPM</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan NPM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama lengkap"
                            {...field}
                          />
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
                        <FormLabel>No. Telepon</FormLabel>
                        <FormControl>
                          <Input placeholder="08xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Laki-Laki</SelectItem>
                            <SelectItem value="FEMALE">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <SelectWilayahField
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val);
                            form.setValue("city_id", "");
                            form.setValue("district_id", "");
                            form.setValue("village_id", "");
                            fetchCities(val);
                          }}
                          placeholder="Pilih Provinsi"
                          options={provinceOptions}
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
                        <SelectWilayahField
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val);
                            form.setValue("district_id", "");
                            form.setValue("village_id", "");
                            fetchDistricts(val);
                          }}
                          placeholder="Pilih Kota/Kabupaten"
                          options={cityOptions}
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
                        <SelectWilayahField
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val);
                            form.setValue("village_id", "");
                            fetchVillages(val);
                          }}
                          placeholder="Pilih Kecamatan"
                          options={districtOptions}
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
                        <SelectWilayahField
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Pilih Kelurahan"
                          options={villageOptions}
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
                </div>
              </div>
              <div className="flex flex-col gap-6 mt-10">
                <h1 className="text-xl font-semibold">Informasi Tambahan</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="CV_file"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          CV
                          {preloadValues.CV_file && (
                            <Link
                              href={preloadValues.CV_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 underline hover:text-blue-800"
                            >
                              (Lihat CV)
                            </Link>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                              handleFileChange(e, "pdf", "CV_file")
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="KTM_file"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          KTM
                          {preloadValues.KTM_file && (
                            <Link
                              href={preloadValues.KTM_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 underline hover:text-blue-800"
                            >
                              (Lihat KTM)
                            </Link>
                          )}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, "image", "KTM_file")
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                            placeholder="https://instagram.com/username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ceritakan tentang dirimu"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <ListEducation
                data={localEducations}
                onDelete={(index) =>
                  setLocalEducations((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onEdit={(index) => {
                  const selected = localEducations[index];
                  setEducationFormData({
                    degree: selected.degree,
                    university: selected.university,
                    faculty: selected.faculty ?? "",
                    major: selected.major ?? "",
                    gpa: selected.gpa ?? undefined,
                    start_year: selected.start_year ?? 2020,
                    end_year: selected.end_year,
                    description: selected.description ?? "",
                    ongoing: selected.end_year === undefined,
                  });
                  setEditingIndex(index);
                  setShowEducationDialog(true);
                }}
                onAddNew={() => {
                  setEditingIndex(null);
                  setEducationFormData(undefined);
                  requestAnimationFrame(() => {
                    setShowEducationDialog(true);
                  });
                }}
              />
              <ListWorkExperience
                data={localWorkExperiences}
                onDelete={(index) =>
                  setLocalWorkExperiences((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onEdit={(index) => {
                  const selected = localWorkExperiences[index];
                  setWorkFormData({
                    ...selected,
                    start_date: new Date(selected.start_date),
                    end_date: selected.end_date
                      ? new Date(selected.end_date)
                      : undefined,
                  });
                  setEditingWorkIndex(index);
                  setShowWorkDialog(true);
                }}
                onAddNew={() => {
                  setEditingWorkIndex(null);
                  setWorkFormData(undefined);
                  setShowWorkDialog(true);
                }}
              />
              <ListOrganizationalExperience
                data={localOrgExperiences}
                onDelete={(index) =>
                  setLocalOrgExperiences((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
                onEdit={(index) => {
                  const selected = localOrgExperiences[index];
                  setOrgFormData({
                    ...selected,
                    start_date: new Date(selected.start_date),
                    end_date: selected.end_date
                      ? new Date(selected.end_date)
                      : undefined,
                  });
                  setEditingOrgIndex(index);
                  setShowOrgDialog(true);
                }}
                onAddNew={() => {
                  setEditingOrgIndex(null);
                  setOrgFormData(undefined);
                  setShowOrgDialog(true);
                }}
              />
              <Button
                type="submit"
                className="w-fit bg-blue-gunakarir dark:text-white mt-10"
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </section>
      </form>
      <EducationFormDialog
        open={showEducationDialog}
        onClose={() => setShowEducationDialog(false)}
        onSave={(newEducation) => {
          if (editingIndex !== null) {
            setLocalEducations((prev) =>
              prev.map((item, i) => (i === editingIndex ? newEducation : item))
            );
          } else {
            setLocalEducations((prev) => [...prev, newEducation]);
          }
          setEditingIndex(null);
          setEducationFormData(undefined);
        }}
        defaultValue={educationFormData}
      />
      <WorkExperienceFormDialog
        open={showWorkDialog}
        onClose={() => setShowWorkDialog(false)}
        onSave={(newWork) => {
          if (editingWorkIndex !== null) {
            setLocalWorkExperiences((prev) =>
              prev.map((item, i) => (i === editingWorkIndex ? newWork : item))
            );
          } else {
            setLocalWorkExperiences((prev) => [...prev, newWork]);
          }

          setEditingWorkIndex(null);
          setWorkFormData(undefined);
        }}
        defaultValue={workFormData}
      />
      <OrganizationalExperienceFormDialog
        open={showOrgDialog}
        onClose={() => setShowOrgDialog(false)}
        onSave={(newOrg) => {
          if (editingOrgIndex !== null) {
            setLocalOrgExperiences((prev) =>
              prev.map((item, i) => (i === editingOrgIndex ? newOrg : item))
            );
          } else {
            setLocalOrgExperiences((prev) => [...prev, newOrg]);
          }
          setEditingOrgIndex(null);
          setOrgFormData(undefined);
        }}
        defaultValue={orgFormData}
      />

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifikasi OTP</DialogTitle>
            <DialogDescription>Masukkan kode OTP dari email</DialogDescription>
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

export default FormUbahProfile;
