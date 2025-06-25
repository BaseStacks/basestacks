import { CheckCircle2Icon, RotateCw } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { MetaSyncType } from "@/components/api/data-type/overview/overview";
import { Button } from "@/components/ui/primitives/button";
import { Alert, AlertTitle } from "@/components/ui/feedback/alert";
import { cn } from "@/lib/utils";
import { getBgColorClass, getBorderColorClass } from "@/lib/colorUtils";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";

const defaultData: Array<MetaSyncType> = [
  {
    models: "User, Order, Product",
    syncState: "In Sync",
  },
  {
    models: "Inventory, Shipment",
    syncState: "Out of Sync",
  },
];
export function MetaSync() {
  const columns: Array<ColumnDef<MetaSyncType>> = [
    {
      accessorKey: "models",
      header: "Models",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "syncState",
      header: "Sync State",
      cell: (info) => info.getValue(),
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-sm font-normal text-gray-600 mb-2">
        Manage connections for your integrations.
      </div>
      <div className="flex justify-between">
        <Alert
          className={cn(
            getBorderColorClass("green", "300"),
            "w-fit",
            getBgColorClass("green", "100")
          )}
        >
          <CheckCircle2Icon color="green" />
          <AlertTitle>Tables metadata is in Sync</AlertTitle>
        </Alert>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              alert("Reloading...");
            }}
          >
            <RotateCw /> Reload
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={defaultData} />
    </div>
  );
}
