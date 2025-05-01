"use client";

import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export type OrganizationalExperience = {
  organization_name: string;
  position: string;
  start_date: Date;
  end_date?: Date;
  description?: string;
};

type Props = {
  data: OrganizationalExperience[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onAddNew: () => void;
};

export default function ListOrganizationalExperience({
  data,
  onDelete,
  onEdit,
  onAddNew,
}: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6 mt-10 px-4">
      <h1 className="text-xl font-semibold">Pengalaman Organisasi</h1>

      {[...data]
        .sort((a, b) => {
          const dateA = a.end_date ?? new Date();
          const dateB = b.end_date ?? new Date();
          return dateB.getTime() - dateA.getTime();
        })
        .map((exp, idx) => (
          <div
            key={idx}
            className="grid gap-3 border p-4 rounded-md bg-neutral-50 dark:bg-neutral-900 w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-row sm:order-2 gap-4">
                <HiOutlinePencilSquare
                  className="w-5 h-5 hover:text-blue-500 cursor-pointer"
                  onClick={() => onEdit(idx)}
                />
                <GoTrash
                  className="w-5 h-5 hover:text-red-500 cursor-pointer"
                  onClick={() => {
                    setDeleteIndex(idx);
                    setShowDeleteDialog(true);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 sm:order-1">
                <h1 className="font-semibold text-base sm:text-lg">
                  {exp.position} - {exp.organization_name}
                </h1>
                <h5 className="text-sm sm:text-base">
                  {format(new Date(exp.start_date), "MMM yyyy")} -{" "}
                  {exp.end_date
                    ? format(new Date(exp.end_date), "MMM yyyy")
                    : "Sekarang"}
                </h5>
              </div>
            </div>

            {exp.description && (
              <p className="md:max-w-5xl text-justify text-sm sm:text-base">
                {exp.description}
              </p>
            )}
          </div>
        ))}

      <Button
        type="button"
        variant="outline"
        className="w-fit"
        onClick={onAddNew}
      >
        Tambah Pengalaman Organisasi
      </Button>

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
                  onDelete(deleteIndex);
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
    </div>
  );
}
