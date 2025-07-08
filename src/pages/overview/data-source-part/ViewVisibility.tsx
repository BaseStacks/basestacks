import { RotateCw, Save } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { VisibilityType } from "@/components/api/data-type/overview/overview";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import { Button } from "@/components/ui/primitives/button";
import { SearchBox } from "@/components/ui/primitives/search-box";
import { Checkbox } from "@/components/ui/primitives/checkbox";

const defaultData: Array<VisibilityType> = [
  {
    tableName: "Users",
    viewName: "User Details",
    editor: "Alice",
    commenter: "Bob",
    viewer: "Charlie",
  },
  {
    tableName: "Orders",
    viewName: "Order History",
    editor: "David",
    commenter: "Eve",
    viewer: "Frank",
  },
  {
    tableName: "Products",
    viewName: "Product List",
    editor: "Grace",
    commenter: "Heidi",
    viewer: "Ivan",
  },
];
export function ViewVisibility() {
  const columns: Array<ColumnDef<VisibilityType>> = [
    {
      accessorKey: "tableName",
      header: "Table Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "viewName",
      header: "View Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "editor",
      header: () => (
        <div className="flex items-center gap-2">
          <Checkbox checked className="border" />
          <span>Editor</span>
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "commenter",
      header: () => (
        <div className="flex items-center gap-2">
          <Checkbox checked className="border" />
          <span>Commenter</span>
        </div>
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "viewer",
      header: () => (
        <div className="flex items-center gap-2">
          <Checkbox checked className="border" />
          <span>Viewer</span>
        </div>
      ),
      cell: (info) => info.getValue(),
    },
  ];
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-sm font-normal text-gray-600 mb-2">
        Manage connections for your integrations.
      </div>
      <div className="flex justify-between mb-6">
        <SearchBox placeholder="Search member..." setSearch={() => {}} />
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <RotateCw /> Reload
          </Button>
          <Button>
            <Save />
            Save
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={defaultData} />
    </div>
  );
}
