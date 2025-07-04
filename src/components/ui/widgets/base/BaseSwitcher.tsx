import { Database, Plus } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../../primitives/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/navigation/dropdown-menu";

import { useBases } from "@/states";
import { cn } from "@/lib/utils";
import { getTextColorClass } from "@/lib/colorUtils";

export function BaseSwitcher() {
  const { bases, activeBaseId } = useBases();

  const activeBase = useMemo(
    () => bases.find((base) => base.id === activeBaseId),
    [bases, activeBaseId]
  );

  if (!activeBase) {
    throw new Error("Active base not found");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="iconSm"
          variant="outline"
          className={cn(
            getTextColorClass(activeBase.color),
            getTextColorClass(activeBase.color, "hover")
          )}
        >
          <Database />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {bases.map((base) => (
          <DropdownMenuCheckboxItem
            key={base.name}
            checked={activeBaseId === base.id}
          >
            {base.name}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus /> Add Base
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
