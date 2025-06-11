import {
    Check,
    ChevronDown,
    Plus,
} from "lucide-react";
import { useMemo } from "react";
import { Button } from "../../primitives/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";


import { useViews } from "@/states";
import { cn } from "@/lib/utils";
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
                <Button size="sm" variant="ghost">
                    {activeView.name}
                    {isMobile && <ChevronDown />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" >
                {views.map((view) => (
                    <DropdownMenuCheckboxItem
                        key={view.name}
                        checked={activeViewId === view.id}
                    >
                        {view.name}
                    </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Plus /> Add View
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}