import { EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  id: string;
}
function ActionButton(props: ActionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button size="icon" variant={"secondary"} className="border-gray-200 border">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!p-1 !w-fit !min-w-fit">
        <DropdownMenuItem
          onClick={() => console.log(`Edit user ${props.id}`)}
          className="!p-0 !w-fit"
        >
          <div
            className={cn(
              "flex flex-1 items-center gap-x-2 rounded-md transition-colors duration-100",
              "hover:bg-red-100 text-red-500 px-2.5 py-1.5 rounded-md"
            )}
          >
            <Trash2 className="text-red-500" />
            <span className="font-normal">Remove user</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default ActionButton;
