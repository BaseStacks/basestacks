import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";

import {
    Command,
    Plus,
} from "lucide-react";

import {
    SidebarMenuButton,
} from "@/components/ui/primitives/sidebar";
import { useWorkspaces } from "@/states";
import { cn } from "@/lib/utils";

export function WorkspaceSwitcher() {
    const { workspaces, activeWorkspaceId } = useWorkspaces();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                    <div>
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Command className="size-4" />
                        </div>
                    </div>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side={"bottom"}
                sideOffset={4}
            >
                {workspaces.map((workspace, index) => (
                    <DropdownMenuItem
                        key={workspace.name}
                        className={cn('gap-2 p-2 mb-1', activeWorkspaceId === workspace.id && 'bg-accent text-accent-foreground')}
                    >
                        {workspace.name}
                        <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                        <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Add Workspace</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}