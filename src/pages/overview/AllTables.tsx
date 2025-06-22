import { Download, HardDrive, SquarePlus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-display/data-table/data-table";
import { getBgColorClass, getTextColorClass } from "@/lib/colorUtils";
import { cn } from "@/lib/utils";

type AllTableProps = Readonly<{
  readonly name: string;
  readonly description: string;
  readonly source: string;
  readonly createdOn: string;
}>;

export function AllTables() {
  const columns: Array<ColumnDef<AllTableProps>> = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Source",
      accessorKey: "source",
    },
    {
      header: "Created On",
      accessorKey: "createdOn",
    },
  ];
  const defaultData: Array<AllTableProps> = [
    {
      name: "Users",
      description: "User data table",
      source: "MySQL",
      createdOn: "2023-10-01",
    },
    {
      name: "Orders",
      description: "Order details table",
      source: "PostgreSQL",
      createdOn: "2023-10-02",
    },
    {
      name: "Products",
      description: "Product inventory table",
      source: "MongoDB",
      createdOn: "2023-10-03",
    },
  ];
  return (
    <div className="container mx-auto px-4 py-10 flex flex-col gap-10">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div
          className={cn(
            "flex flex-col gap-3 p-4 rounded-lg hover:shadow-sm transition-shadow",
            getBgColorClass("gray", "100")
          )}
        >
          <SquarePlus color="blue" size={30} />
          <div>
            <p className="text-md font-semibold">Create New Table</p>
            <span
              className={cn("text-xs font-normal", getTextColorClass("gray"))}
            >
              Start from scratch.
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col gap-3 p-4 rounded-lg hover:shadow-sm transition-shadow",
            getBgColorClass("gray", "100")
          )}
        >
          <Download color="orange" size={30} />
          <div>
            <p className="text-md font-semibold">Import Data</p>
            <span
              className={cn("text-xs font-normal", getTextColorClass("gray"))}
            >
              From files & external sources.
            </span>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-col gap-3 p-4 rounded-lg hover:shadow-sm transition-shadow",
            getBgColorClass("gray", "100")
          )}
        >
          <HardDrive color="green" size={30} />
          <div>
            <p className="text-md font-semibold">Connect External Data</p>
            <span
              className={cn("text-xs font-normal", getTextColorClass("gray"))}
            >
              In realtime to external databases.
            </span>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={defaultData} />
    </div>
  );
}
