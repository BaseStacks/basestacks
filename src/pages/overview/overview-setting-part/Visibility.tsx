import { Switch } from "@/components/ui/primitives/switch";
import { getTextColorClass } from "@/lib/colorUtils";
import { cn } from "@/lib/utils";

export function Visibility() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Visibility & Data Handling</h2>
      <p className="text-sm text-muted-foreground">
        Base specific additional configurations to customise data display &
        default behaviours.
      </p>
      <div className="flex flex-col mt-4">
        <div className="flex gap-2 border rounded-t-md p-3">
          <Switch />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Show M2M Tables</span>
            <span className={cn("text-xs", getTextColorClass("gray"))}>
              Many-to-many relation is supported via a junction table & is
              hidden by default. Enable this option to list all such tables
              along with existing tables.
            </span>
          </div>
        </div>
        <div className="flex gap-2 border-l border-r p-3">
          <Switch />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Show NULL in Cells</span>
            <span className={cn("text-xs", getTextColorClass("gray"))}>
              Display 'NULL' tag in cells holding NULL value. This helps
              differentiate against cells holding EMPTY string.
            </span>
          </div>
        </div>
        <div className="flex gap-2 border rounded-b-md p-3">
          <Switch />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">
              Show NULL and EMPTY in Filter
            </span>
            <span className={cn("text-xs", getTextColorClass("gray"))}>
              Enable 'additional' filters to differentiate fields containing
              NULL & Empty Strings. Default support for Blank treats both NULL &
              Empty strings alike.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
