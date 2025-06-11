import {
    Command,
    Plus,
} from "lucide-react";
import { Button } from "../../primitives/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/primitives/dropdown-menu";


import {
    SidebarMenuButton,
} from "@/components/ui/primitives/sidebar";
import { useWorkspaces } from "@/states";

export function WorkspaceSwitcher() {
    const { workspaces, activeWorkspaceId } = useWorkspaces();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="iconSm">
                    <Command />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" >
                {workspaces.map((workspace, index) => (
                    <DropdownMenuItem
                        key={workspace.name}
                        variant={activeWorkspaceId === workspace.id ? 'active' : 'default'}
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