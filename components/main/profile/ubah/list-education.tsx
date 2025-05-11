"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";

export type Education = {
  degree: string;
  university: string;
  faculty?: string;
  major?: string;
  gpa?: number;
  start_year: number;
  end_year?: number;
  description?: string;
};

type Props = {
  data: Education[];
  onDelete?: (index: number) => void;
  onEdit?: (index: number) => void;
  onAddNew?: () => void;
  withAction?: boolean;
};

export default function ListEducation({
  data,
  onDelete,
  onEdit,
  onAddNew,
  withAction = true,
}: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6 mt-10 px-4">
      <h1 className="text-xl font-semibold">Pendidikan</h1>

      {[...data]
        .sort((a, b) => b.start_year - a.start_year)
        .map((edu, idx) => (
          <div
            key={idx}
            className="grid gap-3 border p-4 rounded-md bg-neutral-50 dark:bg-neutral-900 w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {withAction && (
                <div className="flex flex-row sm:order-2 gap-4">
                  <HiOutlinePencilSquare
                    className="w-5 h-5 hover:text-blue-500 cursor-pointer"
                    onClick={() => onEdit?.(idx)}
                  />
                  <GoTrash
                    className="w-5 h-5 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setDeleteIndex(idx);
                      setShowDeleteDialog(true);
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1 sm:order-1">
                <h1 className="font-semibold text-base sm:text-lg">
                  {edu.degree} {edu.major ? `- ${edu.major}` : ""}
                </h1>
                <h3 className="font-light text-sm sm:text-base">
                  {edu.faculty} - {edu.university}
                </h3>
                <h5 className="text-sm sm:text-base">
                  {edu.start_year} - {edu.end_year ?? "Sekarang"}, IPK:{" "}
                  {edu.gpa ?? "-"}
                </h5>
              </div>
            </div>

            {edu.description && (
              <p className="md:max-w-5xl text-justify text-sm sm:text-base">
                {edu.description}
              </p>
            )}
          </div>
        ))}

      {withAction && (
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={onAddNew}
        >
          Tambah Pendidikan
        </Button>
      )}

      {withAction && (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Konfirmasi Hapus</DialogTitle>
              <DialogDescription>
                Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak
                dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Batal
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteIndex !== null) {
                    onDelete?.(deleteIndex);
                  }
                  setDeleteIndex(null);
                  setShowDeleteDialog(false);
                }}
              >
                Hapus
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
