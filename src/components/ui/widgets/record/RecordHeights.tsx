import { Plus, MoveVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../primitives/dropdown-menu";
import { Button } from "../../primitives/button";

export function RecordHeights() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="iconSm" variant="ghost">
                    <MoveVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Some actions</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
};