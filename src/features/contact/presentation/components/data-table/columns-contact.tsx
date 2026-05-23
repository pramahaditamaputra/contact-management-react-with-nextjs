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
import { DataTableColumnHeader } from "@/src/shared/components/data-table/data-table-column-header";

type ContactColumnsOptions = {
  onEdit: (contact: Contact) => void;
};

export const createContactColumns = ({
  onEdit,
}: ContactColumnsOptions): ColumnDef<Contact, unknown>[] => [
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
    size: 250,
    enableHiding: true,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      return <p>{row.original.phone}</p>;
    },
    size: 250,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <p>{row.original.email}</p>;
    },
    size: 250,
    enableHiding: true,
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => {
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
            <DropdownMenuItem onSelect={() => onEdit(row.original)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
