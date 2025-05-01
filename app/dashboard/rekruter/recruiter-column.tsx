import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Recruiter = {
  id: string;
  company_name: string;
  NPWP: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  user: {
    email: string;
    username: string;
  };
};

export const recruiterColumns: ColumnDef<Recruiter>[] = [
  {
    accessorKey: "company_name",
    header: "Nama Perusahaan",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.company_name}</div>
    ),
  },
  {
    accessorKey: "NPWP",
    header: "NPWP",
    cell: ({ row }) => row.original.NPWP,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => row.original.user.email,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "APPROVED"
              ? "default"
              : status === "REJECTED"
              ? "destructive"
              : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const recruiter = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(recruiter.id)}
            >
              Salin ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
