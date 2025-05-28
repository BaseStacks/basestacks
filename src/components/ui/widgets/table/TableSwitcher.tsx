import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";

import {
    Check,
    Plus,
} from "lucide-react";

import {
    SidebarMenuButton,
} from "@/components/ui/primitives/sidebar";
import { useTables } from "@/states";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Button } from "../../primitives/button";

export function TableSwitcher() {
    const { tables, activeTableId } = useTables();

    const activeTable = useMemo(() => tables.find(table => table.id === activeTableId), [tables, activeTableId]);

    if (!activeTable) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className={cn('data-[state=open]:bg-accent data-[state=open]:text-accent-foreground')}
                >
                    {activeTable.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={"bottom"}
                sideOffset={4}
            >
                {tables.map((table, index) => (
                    <DropdownMenuItem
                        key={table.name}
                        className={cn('gap-2 p-2 mb-1', activeTableId === table.id && 'bg-accent text-accent-foreground')}
                    >
                        {table.name}
                        {activeTableId === table.id && (<Check className="ml-auto size-4 text-green-500" />)}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add Table</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}