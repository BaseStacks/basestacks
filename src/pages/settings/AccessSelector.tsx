import {
  Edit,
  Eye,
  EyeOff,
  MessageSquare,
  ShieldCheck,
  User,
} from "lucide-react";
import type { Color } from "@/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/primitives/select";
import { cn } from "@/lib/utils";
import { getBgColorClass, getTextColorClass } from "@/lib/colorUtils";

export type AccessLevel =
  | "Owner"
  | "Creator"
  | "Editor"
  | "Commenter"
  | "Viewer"
  | "No_Access";

export const accessMap: Record<
  AccessLevel,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    color?: Color;
  }
> = {
  Owner: {
    icon: ShieldCheck,
    label: "Owner",
    color: "purple",
  },
  Creator: {
    icon: User,
    label: "Creator",
    color: "blue",
  },
  Editor: {
    icon: Edit,
    label: "Editor",
    color: "green",
  },
  Commenter: {
    icon: MessageSquare,
    label: "Commenter",
    color: "yellow",
  },
  Viewer: {
    icon: Eye,
    label: "Viewer",
    color: "orange",
  },
  No_Access: {
    icon: EyeOff,
    label: "No Access",
    color: "red",
  },
};

interface AccessSelectorProps {
  value: AccessLevel;
  onChange: (value: AccessLevel) => void;
  className?: string;
}

export function AccessSelector({
  value,
  onChange,
  className,
}: AccessSelectorProps) {
  const currentRole = accessMap[value];

  return (
    <Select value={value} onValueChange={(v) => onChange(v as AccessLevel)}>
      <SelectTrigger
        className={cn(
          "w-[200px] h-10 focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2",
          "justify-start text-left !border-none rounded-md transition-colors duration-150",
          className,
          getBgColorClass(currentRole.color, "100"),
          getBgColorClass(currentRole.color, "300", "hover"),
          getTextColorClass(currentRole.color)
        )}
      >
        <SelectValue placeholder="Select access level">
          <div className="flex items-center gap-x-2">
            <currentRole.icon
              className={getTextColorClass(currentRole.color)}
            />
            <span>{currentRole.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className={cn(
          "bg-white rounded-md shadow-lg border",
          ` dark:${getBgColorClass("gray", "900")}`
        )}
      >
        {Object.entries(accessMap).map(([key, role]) => (
          <SelectItem
            key={key}
            value={key as AccessLevel}
            className={cn(
              "p-0 m-1 rounded-md relative flex w-full cursor-default select-none items-center text-sm outline-none transition-colors",
              "focus:bg-accent/50 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            )}
          >
            <div
              className={cn(
                "flex flex-1 items-center gap-x-2 w-full px-2.5 py-0.5 my-1 rounded-md transition-colors duration-100",
                getBgColorClass(role.color, "100"),
                getBgColorClass(role.color, "300", "hover"),
                getTextColorClass(role.color)
              )}
            >
              <role.icon className={getTextColorClass(role.color)} />
              <span>{role.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
