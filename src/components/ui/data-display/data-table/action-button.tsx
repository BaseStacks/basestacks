import { EllipsisVertical } from "lucide-react";
import { Button } from "../../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../navigation/dropdown-menu";
import { TooltipCustom } from "../../feedback/tooltip-custom";
import type { Color } from "@/Types";
import { cn } from "@/lib/utils";
import { getBgColorClass, getTextColorClass } from "@/lib/colorUtils";

type ActionListItem = Readonly<{
  readonly title: string;
  readonly icon?: React.ComponentType<Readonly<{ readonly className?: string }>>;
  readonly color?: Color;
  readonly className?: string;
  readonly onClick: () => void;
}>;

interface ActionButtonProps {
  readonly id: string;
  readonly listAction: Array<ActionListItem>;
  readonly type?: "button" | "dropdown";
}
export function ActionButton({
  id,
  listAction,
  type = "dropdown",
}: ActionButtonProps) {
  return type === "button" ? (
    <div className="flex gap-x-1">
      {listAction.map((item) => (
        <TooltipCustom value={item.title} key={`action-${id}-${item.title}`}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              getBgColorClass(item.color, "100", "hover"),
              getTextColorClass(item.color)
            )}
            onClick={() => item.onClick()}
          >
            {item.icon && (
              <item.icon
                className={cn(
                  item.className,
                  getTextColorClass(item.color || "gray")
                )}
              />
            )}
          </Button>
        </TooltipCustom>
      ))}
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant={"secondary"}
          className="border-gray-200 border"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!p-1 !w-fit !min-w-fit">
        {listAction.map((item) => (
          <DropdownMenuItem
            key={`action-${id}`}
            onClick={() => item.onClick()}
            className="!p-0 !w-fit cursor-pointer"
          >
            <div
              className={cn(
                "flex flex-1 items-center gap-x-2 rounded-md transition-colors duration-100",
                "px-2.5 py-1.5 rounded-md",
                getBgColorClass(item.color, "100"),
                getBgColorClass(item.color, "300", "hover"),
                getTextColorClass(item.color || "gray")
              )}
            >
              {item.icon && (
                <item.icon
                  className={cn(
                    item.className,
                    getTextColorClass(item.color || "gray")
                  )}
                />
              )}
              <span>{item.title}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
