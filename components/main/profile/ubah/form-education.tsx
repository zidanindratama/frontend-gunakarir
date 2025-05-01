import { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetData } from "@/hooks/use-get-data";
import { StudyProgramWithMajors } from "@/types/study-program-with-majors";
import { cn } from "@/lib/utils";
import { EducationFormData, EducationSchema } from "@/schema/education-schema";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

const DEGREE_OPTIONS = ["D3", "S1", "S2", "S3"];

export default function EducationFormDialog({
  open,
  onClose,
  onSave,
  defaultValue,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: EducationFormData) => void;
  defaultValue?: EducationFormData;
}) {
  const form = useForm<EducationFormData>({
    resolver: zodResolver(EducationSchema),
    defaultValues: defaultValue ?? {
      degree: "",
      university: "",
      faculty: "",
      major: "",
      gpa: undefined,
      start_year: undefined,
      end_year: undefined,
      ongoing: false,
      description: "",
    },
  });

  const selectedFaculty = form.watch("faculty");

  const { data: facultiesData } = useGetData({
    queryKey: ["faculty"],
    dataProtected: "faculties",
  });

  const facultiesDataWithMajors: StudyProgramWithMajors[] =
    facultiesData?.data?.data ?? [];

  const filteredMajors = useMemo(() => {
    const matchedProgram = facultiesDataWithMajors.find(
      (p: StudyProgramWithMajors) => p.name === selectedFaculty
    );
    return matchedProgram?.majors ?? [];
  }, [selectedFaculty, facultiesDataWithMajors]);

  useEffect(() => {
    const isOngoing = defaultValue?.end_year === undefined;
    form.reset({
      degree: defaultValue?.degree ?? "",
      university: defaultValue?.university ?? "",
      faculty: defaultValue?.faculty ?? "",
      major: defaultValue?.major ?? "",
      gpa: defaultValue?.gpa ?? undefined,
      start_year: defaultValue?.start_year ?? undefined,
      end_year: defaultValue?.end_year ?? undefined,
      ongoing: defaultValue ? isOngoing : false,
      description: defaultValue?.description ?? "",
    });
  }, [defaultValue, open]);

  function handleSubmit(values: EducationFormData) {
    onSave(values);
    onClose();
    form.reset();
  }

  const ComboboxField = ({
    label,
    name,
    options,
    placeholder,
  }: {
    label: string;
    name: keyof EducationFormData;
    options: { value: string; label: string }[];
    placeholder: string;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value || placeholder}
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={placeholder} className="h-9" />
                <CommandList>
                  <CommandEmpty>Data tidak ditemukan</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        value={opt.label}
                        key={opt.value}
                        onSelect={() => form.setValue(name, opt.value)}
                      >
                        {opt.label}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            opt.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValue ? "Ubah Pendidikan" : "Tambah Pendidikan"}
          </DialogTitle>
          <DialogDescription>
            {defaultValue
              ? "Perbarui informasi pendidikanmu"
              : "Isi informasi pendidikanmu"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <ComboboxField
              label="Jenjang"
              name="degree"
              options={DEGREE_OPTIONS.map((deg) => ({
                value: deg,
                label: deg,
              }))}
              placeholder="Pilih Jenjang"
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Universitas</FormLabel>
                  <FormControl>
                    <Input placeholder="Universitas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ComboboxField
              label="Program Studi"
              name="faculty"
              options={facultiesDataWithMajors.map((p) => ({
                value: p.name,
                label: p.name,
              }))}
              placeholder="Pilih Program Studi"
            />
            <ComboboxField
              label="Jurusan"
              name="major"
              options={filteredMajors.map((m) => ({
                value: m.name,
                label: m.name,
              }))}
              placeholder="Pilih Jurusan"
            />
            <FormField
              control={form.control}
              name="gpa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IPK</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="IPK"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(
                          val === "" ? undefined : parseFloat(val)
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Mulai</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Tahun Mulai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ongoing"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  {" "}
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) {
                          form.setValue("end_year", undefined);
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Masih berkuliah
                  </FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun Lulus</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Tahun Lulus"
                      {...field}
                      disabled={form.watch("ongoing")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
