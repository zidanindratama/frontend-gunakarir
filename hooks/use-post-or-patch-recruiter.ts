import { usePostData } from "@/hooks/use-post-data";
import { usePatchData } from "@/hooks/use-patch-data";
import { TUser } from "@/types/user-type";

export const usePostOrPatchRecruiter = (user?: TUser) => {
  const post = usePostData({
    queryKey: "user-me",
    dataProtected: "recruiters/request",
    successMessage: "Pengajuan berhasil dikirim!",
    backUrl: "/dashboard/profile",
  });

  const patchAppeal = usePatchData({
    queryKey: "user-me",
    dataProtected: "recruiters/appeal",
    successMessage: "Pengajuan banding berhasil!",
    backUrl: "/dashboard/profile",
  });

  const patchPending = usePatchData({
    queryKey: "user-me",
    dataProtected: "recruiters/update-pending",
    successMessage: "Profil berhasil diperbarui!",
    backUrl: "/dashboard/profile",
  });

  const submit = (values: any) => {
    if (!user?.recruiter) {
      post.mutate(values); // CREATE
    } else if (user.recruiter.status === "REJECTED") {
      patchAppeal.mutate(values); // APPEAL
    } else if (user.recruiter.status === "PENDING") {
      patchPending.mutate(values); // UPDATE PENDING
    }
  };

  return { submit };
};
