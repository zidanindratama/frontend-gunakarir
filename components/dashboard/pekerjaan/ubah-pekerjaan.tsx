"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWilayah } from "@/hooks/useWilayah";
import { CreateJobFormData, CreateJobSchema } from "@/schema/job-create.schema";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { useGetData } from "@/hooks/use-get-data";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { MultiSelectField } from "@/components/ui/multi-select-field";
import { useInfiniteFetcher } from "@/hooks/use-get-infinite-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { useEffect, useState } from "react";
import { TJobMajor } from "@/types/user-type";
import { Switch } from "@/components/ui/switch";
import { SelectWilayahField } from "@/components/ui/select-wilayah-field";

const UbahPekerjaan = ({ pekerjaanId }: { pekerjaanId: string }) => {
  const [isReady, setIsReady] = useState(false);

  const { data: pekerjaanData } = useGetData({
    queryKey: ["job", pekerjaanId],
    dataProtected: `jobs/${pekerjaanId}`,
  });

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: pekerjaanData?.data,
  });

  const wilayah = useWilayah({
    provinceId: form.watch("province_id"),
  });

  const { data, fetchNextPage, hasNextPage, search, setSearch } =
    useInfiniteFetcher({
      endpoint: "/majors",
      queryKey: "majors",
      searchParam: "search",
      initialParams: { limit: 10 },
    });
  const majorOptions = data?.pages.flatMap((page) => page.data) || [];

  const { mutate: updateJob } = usePatchData({
    queryKey: "jobs",
    dataProtected: `jobs/${pekerjaanId}`,
    successMessage: "Lowongan pekerjaan berhasil diperbarui!",
    backUrl: "/dashboard/pekerjaan",
  });

  const onSubmit = (values: CreateJobFormData) => {
    updateJob(values);
  };

  useEffect(() => {
    if (pekerjaanData?.data) {
      const formValue = {
        ...pekerjaanData.data,
        full_description: pekerjaanData.data.full_description ?? "",
        type: pekerjaanData.data.type ?? "",
        major_ids:
          pekerjaanData.data.jobMajors?.map((m: TJobMajor) => m.major.id) ?? [],
      };
      form.reset(formValue);
      setIsReady(true);
    }
  }, [pekerjaanData]);

  if (!isReady) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Ubah Pekerjaan</CardTitle>
            <CardDescription>Edit detail lowongan pekerjaan.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama pekerjaan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama pekerjaan" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Pekerjaan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Tipe Pekerjaan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FULL_TIME">
                          Penuh Waktu (Full Time)
                        </SelectItem>
                        <SelectItem value="PART_TIME">
                          Paruh Waktu (Part Time)
                        </SelectItem>
                        <SelectItem value="INTERNSHIP">Magang</SelectItem>
                        <SelectItem value="CONTRACT">Kontrak</SelectItem>
                        <SelectItem value="FREELANCE">
                          Lepas (Freelance)
                        </SelectItem>
                        <SelectItem value="TEMPORARY">Sementara</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="major_ids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Studi</FormLabel>
                    <FormControl>
                      <MultiSelectField
                        field={field}
                        options={majorOptions}
                        valueKey="id"
                        labelKey="name"
                        placeholder="Pilih Program Studi"
                        searchValue={search}
                        onSearchChange={setSearch}
                        fetchMore={fetchNextPage}
                        hasMore={hasNextPage}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaji (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuota</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DatePickerField
              control={form.control}
              name="application_start"
              label="Tanggal Mulai Lamar"
              disabledBefore1900
            />
            <DatePickerField
              control={form.control}
              name="application_end"
              label="Tanggal Akhir Lamar"
              disabledBefore1900
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
                      wilayah.fetchCities(val);
                    }}
                    options={wilayah.provinceOptions}
                    placeholder="Pilih Provinsi"
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
                    onChange={field.onChange}
                    options={wilayah.cityOptions}
                    placeholder="Pilih Kota"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="short_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Singkat</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Deskripsi singkat pekerjaan"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="full_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Lengkap</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        key={pekerjaanId}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full"
                        editorContentClassName="p-5"
                        output="html"
                        placeholder="Masukkan deskripsi lengkap pekerjaan..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-blue-500">
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default UbahPekerjaan;
