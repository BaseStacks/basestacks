import { Trash2 } from "lucide-react";
import { AccessSelector } from "./AccessSelector";
import type { AccessLevel } from "./AccessSelector";
import type { ColumnDef } from "@tanstack/react-table";
import { HeaderSorted } from "@/components/ui/data-display/data-table/header-sorted";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import { DialogCustom } from "@/components/ui/overlay/dialog-custom";
import { ActionButton } from "@/components/ui/data-display/data-table/action-button";
import { Checkbox } from "@/components/ui/primitives/checkbox";
import { SearchBox } from "@/components/ui/primitives/search-box";
import { Input } from "@/components/ui/primitives/input";

export interface MemberProps {
  id: string;
  users: string;
  access: AccessLevel;
  dateJoined: string;
}

const columns: Array<ColumnDef<MemberProps>> = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
        className="border-gray-200 bg-white"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-gray-200 bg-white"
      />
    ),
    meta: {
      headerClass: "text-center",
      cellClass: "text-center",
    },
  },
  {
    accessorKey: "users",
    header: ({ column }) => {
      return <HeaderSorted title="User" column={column} />;
    },
    meta: {
      headerClass: "text-left",
      cellClass: "text-left",
    },
  },
  {
    accessorKey: "access",
    header: ({ column }) => {
      return <HeaderSorted title="Access" column={column} />;
    },
    cell: ({ row }: any) => (
      <AccessSelector
        value={row.original.access}
        onChange={(value) => console.log("Access changed:", value)}
        className="px-1 py-0.5 w-fit !h-fit"
      />
    ),
    meta: {
      headerClass: "text-left",
      cellClass: "text-left",
    },
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    meta: {
      headerClass: "text-left",
      cellClass: "text-left",
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButton
        id={row.original.id}
        listAction={[
          {
            title: "Remove user",
            icon: Trash2,
            color: "red",
            onClick: () => {},
          },
        ]}
      />
    ),
    meta: {
      headerClass: "text-right",
      cellClass: "text-right",
    },
  },
];

const data: Array<MemberProps> = [
  {
    id: "728ed52f",
    users: "m@example.com",
    access: "Owner",
    dateJoined: "2023-10-01",
  },
  {
    id: "a93d7e1c",
    users: "user1@mail.com",
    access: "Creator",
    dateJoined: "2024-05-17",
  },
  {
    id: "b72ac8d0",
    users: "user2@example.com",
    access: "Owner",
    dateJoined: "2023-12-03",
  },
  {
    id: "c4f12a67",
    users: "user3@gmail.com",
    access: "Viewer",
    dateJoined: "2024-08-21",
  },
  {
    id: "f0be9a25",
    users: "user4@mail.com",
    access: "Viewer",
    dateJoined: "2023-11-09",
  },
  {
    id: "e1c34598",
    users: "user5@gmail.com",
    access: "Owner",
    dateJoined: "2024-03-14",
  },
  {
    id: "d88ac472",
    users: "user6@example.com",
    access: "Commenter",
    dateJoined: "2023-09-28",
  },
  {
    id: "ab29cd90",
    users: "user7@mail.com",
    access: "No_Access",
    dateJoined: "2024-01-19",
  },
  {
    id: "fe9021d4",
    users: "user8@example.com",
    access: "Creator",
    dateJoined: "2023-07-30",
  },
  {
    id: "bc18f276",
    users: "user9@gmail.com",
    access: "Owner",
    dateJoined: "2024-06-02",
  },
  {
    id: "a7c34d89",
    users: "user10@mail.com",
    access: "Editor",
    dateJoined: "2023-10-15",
  },
];

export function Member() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col justify-center text-center">
        <div className="flex justify-between mb-6">
          <SearchBox placeholder="Search member..." setSearch={() => {}} />

          <DialogCustom
            buttonText="+ Add Member"
            title="Invite to Workspace"
            submitText="Invite to Workspace"
          >
            <Input placeholder="Enter email addresses" />
            <AccessSelector value="No_Access" onChange={() => {}} />
          </DialogCustom>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
