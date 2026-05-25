import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTableColumnHeader } from "@/src/shared/components/data-table/data-table-column-header";
import { ContactUi } from "../../viewmodels/mappers/contact.mapper";

const contactColumns = (): ColumnDef<ContactUi, unknown>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    size: 250,
    enableHiding: true,
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.picture || "/avatar.png"}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      );
    },
    size: 250,
    enableHiding: true,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    size: 250,
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250,
    enableHiding: true,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    size: 250,
    enableHiding: true,
  },
];

export default contactColumns;
