import { Files, Pencil } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import { HeaderSorted } from "@/components/ui/data-display/data-table/header-sorted";
import { SearchBox } from "@/components/ui/primitives/search-box";
import { getTextColorClass } from "@/lib/colorUtils";
import { cn } from "@/lib/utils";
import { ActionButton } from "@/components/ui/data-display/data-table/action-button";
import { Checkbox } from "@/components/ui/primitives/checkbox";

type ConnectionProps = {
  id: string;
  name: string;
  type: "Mysql" | "PostgreSQL" | "MongoDB";
  date: string;
  addBy: string;
  usage: number;
};

export function Connection() {
  const columns: Array<ColumnDef<ConnectionProps>> = [
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
      accessorKey: "name",
      header: ({ column }) => {
        return <HeaderSorted title="Name" column={column} />;
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return <HeaderSorted title="Type" column={column} />;
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return <HeaderSorted title="Date Added" column={column} />;
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "addBy",
      header: ({ column }) => {
        return <HeaderSorted title="Added by" column={column} />;
      },
      meta: {
        headerClass: "text-left",
        cellClass: "text-left",
      },
    },
    {
      accessorKey: "usage",
      header: ({ column }) => {
        return <HeaderSorted title="Usage" column={column} />;
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
          listAction={[
            {
              title: "Edit",
              icon: Pencil,
              onClick: () => {},
            },
            {
              title: "Duplicate",
              icon: Files,
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

  const typedConnectionData: Array<ConnectionProps> = [
    {
      id: "conn-1",
      name: "Logs-1",
      type: "PostgreSQL",
      date: "2024-07-11",
      addBy: "Eve",
      usage: 315,
    },
    {
      id: "conn-2",
      name: "Analytics-2",
      type: "PostgreSQL",
      date: "2024-11-19",
      addBy: "Diana",
      usage: 670,
    },
    {
      id: "conn-3",
      name: "Logs-3",
      type: "MongoDB",
      date: "2024-08-21",
      addBy: "Diana",
      usage: 332,
    },
    {
      id: "conn-4",
      name: "E-Commerce-4",
      type: "MongoDB",
      date: "2022-09-12",
      addBy: "Charlie",
      usage: 658,
    },
  ];
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col justify-center gap-4">
        <div className="text-sm font-normal text-gray-600 mb-2">
          Manage connections for your integrations.
          <a
            href="#"
            className={cn(
              "ml-1",
              getTextColorClass("blue"),
              getTextColorClass("blue", "hover")
            )}
          >
            Learn more
          </a>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <SearchBox placeholder="Search member..." setSearch={() => {}} />
          <DataTable
            columns={columns}
            data={typedConnectionData}
            showPagination
          />
        </div>
      </div>
    </div>
  );
}
