import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { AddMember } from "./AddMember";
import { RoleSelector } from "./RoleSelector";
import type { RoleLevel } from "./RoleSelector";
import type { ColumnDef } from "@tanstack/react-table";
import type { DeleteModalContent } from "@/components/ui/DeleteDialogProvider";
import { HeaderSorted } from "@/components/ui/data-display/data-table/header-sorted";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import { ActionButton } from "@/components/ui/data-display/data-table/action-button";
import { useDeleteModal } from "@/components/ui/DeleteDialogProvider";
import { Checkbox } from "@/components/ui/primitives/checkbox";
import { SearchBox } from "@/components/ui/primitives/search-box";
import { Button } from "@/components/ui/primitives/button";
import { useDialog } from "@/components/ui/DialogProvider";
import { Toast } from "@/lib/toast";

export interface MemberProps {
  readonly id: string;
  readonly users: string;
  readonly access: RoleLevel;
  readonly dateJoined: string;
}

const defaultData: Array<MemberProps> = [
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
  const { openDialog, closeDialog } = useDialog();
  const { openModal } = useDeleteModal();
  const [data, setData] = useState<Array<MemberProps>>(defaultData);
  const form = useForm({
    defaultValues: {
      email: "",
      access: "Viewer",
    },
  });

  const updateData = (id: string, value: RoleLevel) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, access: value } : item
    );
    setData(newData);
    Toast.success({ title: "Member: " + id + " role updated successfully!" });
    console.log("Updated data:", newData);
  };

  const handleClickDelete = (member: DeleteModalContent) => {
    openModal(member, (item) => {
      setData((prevData) => prevData.filter((o) => o.id !== item.id));
      Toast.success({
        title: "Member: " + item.id + " removed successfully!",
      });
    });
  };

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
        <RoleSelector
          value={row.original.access}
          onChange={(value) => updateData(row.original.id, value)}
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
              onClick: () => {
                handleClickDelete({
                  title: "Confirm Delete",
                  description: `Are you sure you want to delete the member "${row.original.users}"? This action cannot be undone.`,
                  value: row.original.users,
                  id: row.original.id,
                });
              },
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col justify-center text-center">
        <div className="flex justify-between mb-6">
          <SearchBox placeholder="Search member..." setSearch={() => {}} />

          <Button
            onClick={() =>
              openDialog(
                {
                  title: "Invite to Workspace",
                  confirmText: "Invite to Workspace",
                  value: <AddMember form={form} />,
                },
                () => {
                  form.handleSubmit((value) => {
                    setData((prevData) => [
                      ...prevData,
                      {
                        id: (prevData.length + 1).toString(),
                        users: value.email,
                        access: value.access as RoleLevel,
                        dateJoined: new Date().toISOString().split("T")[0],
                      },
                    ]);
                    form.reset();
                    Toast.success({ title: "Member added successfully!" });
                    closeDialog();
                  })();
                }
              )
            }
          >
            + Add Member
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
