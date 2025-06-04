import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/primitives/select";
import {
  ShieldCheck,
  User,
  Edit,
  MessageSquare,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type AccessLevel =
  | "Owner"
  | "Creator"
  | "Editor"
  | "Commenter"
  | "Viewer"
  | "No Access";

export const accessMap: Record<
  AccessLevel,
  {
    icon: ReactNode;
    label: string;
    bgColorLightClass: string;
    textColorClass: string;
  }
> = {
  Owner: {
    icon: <ShieldCheck className="w-4 h-4 text-purple-700" />,
    label: "Owner",
    bgColorLightClass: "bg-purple-100 hover:bg-purple-300",
    textColorClass: "text-purple-700",
  },
  Creator: {
    icon: <User className="w-4 h-4 text-blue-700" />,
    label: "Creator",
    bgColorLightClass: "bg-blue-100 hover:bg-blue-300",
    textColorClass: "text-blue-700",
  },
  Editor: {
    icon: <Edit className="w-4 h-4 text-green-700" />,
    label: "Editor",
    bgColorLightClass: "bg-green-100 hover:bg-green-300",
    textColorClass: "text-green-700",
  },
  Commenter: {
    icon: <MessageSquare className="w-4 h-4 text-orange-700" />,
    label: "Commenter",
    bgColorLightClass: "bg-orange-100 hover:bg-orange-300",
    textColorClass: "text-orange-700",
  },
  Viewer: {
    icon: <Eye className="w-4 h-4 text-yellow-700" />,
    label: "Viewer",
    bgColorLightClass: "bg-yellow-100 hover:bg-yellow-300",
    textColorClass: "text-yellow-700",
  },
  "No Access": {
    icon: <EyeOff className="w-4 h-4 text-red-700" />,
    label: "No Access",
    bgColorLightClass: "bg-red-100 hover:bg-red-300",
    textColorClass: "text-red-700",
  },
};

interface AccessSelectorProps {
  value: AccessLevel;
  onChange: (value: AccessLevel) => void;
  className?: string;
}

export function AccessSelector({ value, onChange, className }: AccessSelectorProps) {
  const currentAccessConfig = accessMap[value];

  return (
    <Select value={value} onValueChange={(v) => onChange(v as AccessLevel)}>
      <SelectTrigger
        className={cn(
          "w-[200px] h-10 focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:ring-offset-2",
          "justify-start text-left !border-none rounded-md transition-colors duration-150",
          className,
          currentAccessConfig
            ? currentAccessConfig.bgColorLightClass
            : "bg-gray-100 hover:bg-gray-200",
          currentAccessConfig
            ? currentAccessConfig.textColorClass
            : "text-gray-900"
        )}
      >
        <SelectValue placeholder="Select access level">
          {currentAccessConfig && (
            <div className="flex items-center gap-x-2">
              {currentAccessConfig.icon}
              <span>{currentAccessConfig.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="p-1 bg-white rounded-md shadow-lg border">
        {Object.entries(accessMap).map(([key, itemConfig]) => (
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
                itemConfig.bgColorLightClass,
                itemConfig.textColorClass
              )}
            >
              {itemConfig.icon}
              <span className="font-normal">{itemConfig.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
