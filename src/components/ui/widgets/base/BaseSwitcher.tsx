import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";

import {
    Check,
    Database,
    Plus,
} from "lucide-react";

import { useBases } from "@/states";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { getTextColorClass } from "@/lib/colorUtils";
import { Button } from "../../primitives/button";

export function BaseSwitcher() {
    const { bases, activeBaseId } = useBases();

    const activeBase = useMemo(() => bases.find(base => base.id === activeBaseId), [bases, activeBaseId]);

    if (!activeBase) {
        throw new Error("Active base not found");
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="iconSm"
                    variant="ghost"
                    className={cn(getTextColorClass(activeBase.color), getTextColorClass(activeBase.color, 'hover'))}
                >
                    <Database className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={"bottom"}
                sideOffset={4}
            >
                {bases.map((base) => (
                    <DropdownMenuItem
                        key={base.name}
                        className={cn('gap-2 p-2 mb-1', activeBaseId === base.id && 'bg-accent text-accent-foreground')}
                    >
                        {base.name}
                        {activeBaseId === base.id && (<Check className="ml-auto size-4 text-green-500" />)}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add Base</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}