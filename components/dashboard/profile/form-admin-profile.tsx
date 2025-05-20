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
import { useFileUploader } from "@/hooks/use-file-uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetData } from "@/hooks/use-get-data";
import { TUser } from "@/types/user-type";
import { usePatchData } from "@/hooks/use-patch-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AdminProfileUpdateFormData,
  AdminProfileUpdateSchema,
} from "@/schema/admin-profile-update-schema";
import { useForm } from "react-hook-form";

const FormAdminProfile = () => {
  const { data: userData } = useGetData({
    queryKey: ["user-me"],
    dataProtected: "auth/me",
  });
  const user: TUser = userData?.data;

  const preloadValues: AdminProfileUpdateFormData = {
    username: user.username ?? "",
    image_url: user.image_url ?? "",
  };

  const form = useForm<AdminProfileUpdateFormData>({
    resolver: zodResolver(AdminProfileUpdateSchema),
    values: preloadValues,
  });

  const { uploadFile } = useFileUploader();

  const { mutate: adminProfileUpdate } = usePatchData({
    queryKey: "user-me",
    dataProtected: "auth/update-admin-profile",
    successMessage: "Profil berhasil diperbarui!",
    backUrl: "/dashboard/profile",
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "pdf" | "image",
    field: keyof AdminProfileUpdateFormData
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file, type);
    form.setValue(field, url || "", { shouldValidate: true });
  };

  const onSubmit = (values: AdminProfileUpdateFormData) => {
    adminProfileUpdate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <CardTitle>Informasi Admin</CardTitle>
                <CardDescription>
                  Lengkapi profil Anda sebagai admin untuk memperbarui informasi
                  akun.
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
              </CardContent>
            </div>
          </div>
          <CardFooter>
            <Button type="submit" className="w-fit bg-blue-500">
              Ubah Profil
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default FormAdminProfile;
