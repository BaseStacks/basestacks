import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { SnapshotType } from "@/components/api/data-type/overview/overview";
import { getTextColorClass } from "@/lib/colorUtils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/primitives/button";
import { ActionButton } from "@/components/ui/data-display/data-table/action-button";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import noData from "@/assets/No Data.svg";
import { TableCell, TableRow } from "@/components/ui/data-display/table";
import { Input } from "@/components/ui/primitives/input";
import { HeaderSorted } from "@/components/ui/data-display/data-table/header-sorted";

const listToken: Array<SnapshotType> = [
  {
    id: "1",
    name: "Admin Access",
    creator: "alice@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Integration Key",
    creator: "bob@example.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Service Token",
    creator: "carol@example.com",
    createdAt: new Date().toISOString(),
  },
];

export function Snapshots() {
  const [data, setData] = useState<Array<SnapshotType>>(listToken);
  const [showAddSnapshot, setShowAddSnapshot] = useState(false);
  const form = useForm<SnapshotType>({
    defaultValues: {
      id: "",
      name: "",
      creator: "user@example.com",
      createdAt: new Date().toISOString(),
    },
  });

  const onSubmit = (formData: SnapshotType) => {
    setShowAddSnapshot(false);
    setData((prev) => [
      ...prev,
      {
        ...formData,
        id: String(prev.length + 1),
        creator: formData.creator,
        createdAt: new Date().toISOString(),
      },
    ]);
    form.reset();
  };
  const onCancel = () => {
    setShowAddSnapshot(false);
    form.reset();
  };
  const onDelete = (id: string) => {
    console.log(`Deleting snapshot with id: ${id}`);
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const columns: Array<ColumnDef<SnapshotType>> = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <HeaderSorted title="Snapshot" column={column} />;
      },
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
          type="group"
          className="justify-end"
          listAction={[
            {
              title: "Restore",
              onClick: () => {},
            },
            {
              icon: Trash2,
              color: "red",
              onClick: () => {
                onDelete(row.original.id);
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
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Base Snapshots</h2>
      <p className={cn("text-sm", getTextColorClass("gray"))}>
        Snapshots serve as comprehensive backups of your base, capturing its
        state at the time of creation. Restoring a snapshot creates a new
        instance of the base in the designated workspace.
      </p>
      <div className="flex flex-col gap-2">
        <Button className="w-fit" onClick={() => setShowAddSnapshot(true)}>
          New Snapshot
        </Button>
        <FormProvider {...form}>
          <DataTable
            columns={columns}
            data={data}
            customRow={
              showAddSnapshot ?
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex items-center justify-between gap-4"
                    >
                      <Input
                        {...form.register("name", { required: "true" })}
                        placeholder="Snapshot Name"
                      />
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={onCancel}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
              : null
            }
            emptyTable={
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <img src={noData} alt="" />
                <div className="text-2xl font-semibold">No Snapshots Found</div>
                <span>Looks like you haven’t created any snapshots yet.</span>
                <Button onClick={() => setShowAddSnapshot(true)}>
                  Create new snapshot
                </Button>
              </div>
            }
          />
        </FormProvider>
      </div>
    </div>
  );
}
