import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "../../../domain/entities/contact";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import { Button } from "@/src/shared/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalCircle01Icon } from "@hugeicons/core-free-icons";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Image
            src={row.original.image || "/avatar.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <p>{row.original.name}</p>
        </div>
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return <p>{row.original.phone}</p>;
    },
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <p>{row.original.email}</p>;
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <HugeiconsIcon icon={MoreVerticalCircle01Icon} strokeWidth={2} />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
