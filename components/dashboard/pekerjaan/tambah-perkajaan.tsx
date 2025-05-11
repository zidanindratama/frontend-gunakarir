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
  FormDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useWilayah } from "@/hooks/useWilayah";
import { usePostData } from "@/hooks/use-post-data";
import {
  CreateJobFormData,
  CreateJobSchema,
  JobType,
} from "@/schema/job-create.schema";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { MultiSelectField } from "@/components/ui/multi-select-field";
import { useInfiniteFetcher } from "@/hooks/use-get-infinite-data";
import { Switch } from "@/components/ui/switch";
import { SelectWilayahField } from "@/components/ui/select-wilayah-field";
import { useForm } from "react-hook-form";

const TambahPekerjaan = () => {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });
  const user: TUser = userData?.data;

  const form = useForm<CreateJobFormData>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      title: "",
      short_description: "",
      full_description: "",
      salary: 0,
      quota: 0,
      application_start: new Date(),
      application_end: new Date(),
      province_id: "",
      city_id: "",
      status: false,
      type: "" as JobType,
      major_ids: [],
    },
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

  const { mutate: submitJob } = usePostData({
    queryKey: "jobs",
    dataProtected: `jobs/${user?.recruiter?.id}`,
    successMessage: "Lowongan pekerjaan berhasil ditambahkan!",
    backUrl: "/dashboard/pekerjaan",
  });

  const onSubmit = (values: CreateJobFormData) => {
    submitJob(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Pekerjaan</CardTitle>
            <CardDescription>
              Isi detail lowongan pekerjaan baru.
            </CardDescription>
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
                    <FormMessage />
                    <FormDescription>
                      Aktifkan jika pekerjaan ini tersedia dan dapat dilamar
                      oleh kandidat.
                    </FormDescription>
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
                    <FormDescription>
                      Tidak perlu diisi jika untuk semua jurusan.
                    </FormDescription>
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
              Simpan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default TambahPekerjaan;
