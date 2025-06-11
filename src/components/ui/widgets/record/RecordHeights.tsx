import { MoveVertical, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../primitives/dropdown-menu";
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
                <DropdownMenuLabel>
                    Record Heights
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                    Short
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                    Medium
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                    Tall
                </DropdownMenuCheckboxItem>
                 <DropdownMenuCheckboxItem>
                    Extra
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
};