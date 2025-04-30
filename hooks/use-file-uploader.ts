import axiosInstance from "@/helpers/axios-instance";
import { toast } from "sonner";

type UploadType = "image" | "pdf";

export const useFileUploader = () => {
  const uploadFile = async (
    file: File,
    type: UploadType
  ): Promise<string | null> => {
    if (type === "pdf" && file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file PDF maksimal 5MB");
      return null;
    }

    if (type === "image" && !file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Mengunggah file...");

    try {
      const res = await axiosInstance.post(
        `/upload/file?type=${type}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("File berhasil diunggah!", { id: toastId });
      return res.data.secure_url;
    } catch (error) {
      toast.error("Gagal mengunggah file", { id: toastId });
      return null;
    }
  };

  return { uploadFile };
};
