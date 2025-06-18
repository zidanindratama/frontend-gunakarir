"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TFeedback } from "@/types/feedback-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AksiUmpanBalik } from "./aksi-umpan-balik";

export const umpanBalikColumns: ColumnDef<TFeedback>[] = [
  {
    accessorKey: "user",
    header: "Pengguna",
    cell: ({ row }) => {
      const user = row.original.user;
      const username = user?.username || "Pengguna";
      const initial = username.charAt(0).toUpperCase();

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-16">
            <AvatarImage
              src={user?.image_url || "/placeholder.svg"}
              alt={username}
              className="object-cover"
            />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i <= rating
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "stroke-muted-foreground"
              )}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "message",
    header: "Pesan",
    cell: ({ row }) => (
      <p className="text-sm text-muted-foreground max-w-xs truncate">
        {row.original.message}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) =>
      format(new Date(row.original.created_at), "dd MMM yyyy HH:mm"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <AksiUmpanBalik feedbackId={row.original.id} />,
  },
];
