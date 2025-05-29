import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";

import {
    Check,
    ChevronDown,
    Plus,
} from "lucide-react";

import { useViews } from "@/states";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Button } from "../../primitives/button";
import { useIsMobile } from "@/hooks/ui/useIsMobile";

export function ViewSwitcher() {
    const isMobile = useIsMobile();
    const { views, activeViewId } = useViews();

    const activeView = useMemo(() => views.find(view => view.id === activeViewId), [views, activeViewId]);

    if (!activeView) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                >
                    {activeView.name}
                    {isMobile && <ChevronDown />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" >
                {views.map((view) => (
                    <DropdownMenuItem
                        key={view.name}
                        className={cn('gap-2 p-2', activeViewId === view.id && 'bg-accent text-accent-foreground')}
                    >
                        {view.name}
                        {activeViewId === view.id && (<Check className="ml-auto size-4 text-green-500" />)}
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add View</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}