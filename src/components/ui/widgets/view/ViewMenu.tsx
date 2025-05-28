import { Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../primitives/dropdown-menu";

interface ViewMenuProps {
    readonly children: React.ReactNode;
}

export function ViewMenu({ children }: ViewMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={"bottom"}
                sideOffset={4}
            >
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