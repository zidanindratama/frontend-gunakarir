"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/use-delete-data";
import { Trash2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  recruiterId: string;
};

const AksiRekruter = ({ recruiterId }: Props) => {
  const [open, setOpen] = useState(false);
  const deleteRecruiter = useDeleteData({
    queryKey: "recruiter",
    dataProtected: `recruiters/${recruiterId}`,
    successMessage: "Rekruter berhasil dihapus!",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/rekruter/${recruiterId}`}>
              Lihat Detail
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4 text-red-600 hover:text-red-600" />
              <span className="text-red-600 hover:text-red-600">Hapus</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah kamu yakin ingin menghapus rekruter ini?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteRecruiter.mutate();
              setOpen(false);
            }}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AksiRekruter;
