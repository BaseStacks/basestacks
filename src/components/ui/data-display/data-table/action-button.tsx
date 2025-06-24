import { EllipsisVertical } from "lucide-react";
import { Button } from "../../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../navigation/dropdown-menu";
import { TooltipCustom } from "../../feedback/tooltip-custom";
import { Separator } from "../../primitives/separator";
import type { Color } from "@/Types";
import { cn } from "@/lib/utils";
import { getBgColorClass, getTextColorClass } from "@/lib/colorUtils";

type ActionListItem = Readonly<{
  readonly title?: string;
  readonly icon?: React.ComponentType<
    Readonly<{ readonly className?: string }>
  >;
  readonly color?: Color;
  readonly className?: string;
  readonly onClick: () => void;
}>;

interface ActionButtonProps {
  readonly id: string;
  readonly listAction: Array<ActionListItem>;
  readonly type?: "button" | "dropdown" | "group";
  readonly className?: string;
}
export function ActionButton({
  id,
  listAction,
  type = "dropdown",
  className,
}: ActionButtonProps) {
  return (
    type === "button" ?
      <div className={cn("flex", className)}>
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
    : type == "group" ?
      <div className={cn("flex divide-x divide-muted-foreground", className)}>
        {listAction.map((item) => (
          <Button
            key={`action-${id}-${item.title}`}
            variant="secondary"
            className={cn(
              "rounded-none first:rounded-l-md last:rounded-r-md border-gray-200 px-2.5 py-1.5",
              getTextColorClass(item.color)
            )}
            onClick={() => item.onClick()}
            disabled={!item.onClick}
          >
            {item.icon && (
              <item.icon className={getTextColorClass(item.color)} />
            )}
            {item.title && item.title}
          </Button>
        ))}
      </div>
    : <DropdownMenu>
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
            <>
              <DropdownMenuItem
                key={`action-${id}-${item.title}`}
                onClick={() => item.onClick()}
                className="!p-0 cursor-pointer w-full"
              >
                <div
                  className={cn(
                    "flex flex-1 items-center gap-x-2 rounded-md transition-colors duration-100",
                    "px-2.5 py-1.5 rounded-md",
                    // getBgColorClass(item.color, "100"),
                    getBgColorClass(item.color, "100", "hover"),
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
              {listAction.indexOf(item) < listAction.length - 1 && (
                <Separator />
              )}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
