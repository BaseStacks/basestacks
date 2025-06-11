import {
    Check,
    Plus,
} from "lucide-react";
import { useMemo } from "react";
import { Button } from "../../primitives/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";


import { useTables } from "@/states";
import { cn } from "@/lib/utils";

export function TableSwitcher() {
    const { tables, activeTableId } = useTables();

    const activeTable = useMemo(() => tables.find(table => table.id === activeTableId), [tables, activeTableId]);

    if (!activeTable) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost">
                    {activeTable.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {tables.map((table) => (
                    <DropdownMenuCheckboxItem
                        key={table.name}
                        checked={activeTableId === table.id}
                    >
                        {table.name}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Plus /> Add Table
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}