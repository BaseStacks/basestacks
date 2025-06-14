import { toast } from "sonner";
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { cn } from "./utils";
import { getBgColorClass } from "./colorUtils";
import type { ToastType } from "@/Types";
import { Button } from "@/components/ui/primitives/button";

interface ToastOptions {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  Icon?: React.ComponentType<{ className?: string }>;
}

function getIcon(type: ToastType) {
  const iconClass = "shrink-0";
  switch (type) {
    case "success":
      return <CheckCircle size={24} className={iconClass} />;
    case "error":
      return <XCircle size={24} className={iconClass} />;
    case "info":
      return <Info size={24} className={iconClass} />;
    case "warning":
      return <AlertTriangle size={24} className={iconClass} />;
  }
}

function getStyle(type: ToastType) {
  switch (type) {
    case "success":
      return getBgColorClass("green", "500");
    case "error":
      return getBgColorClass("red", "500");
    case "info":
      return getBgColorClass("blue", "500");
    case "warning":
      return getBgColorClass("yellow", "500");
  }
}
function show(type: ToastType, options: ToastOptions) {
  toast.custom((t) => (
    <div
      className={cn(
        "flex items-start gap-3 p-4 shadow-lg w-[400px] text-white rounded-lg justify-between items-center",
        getStyle(type)
      )}
    >
      {options.Icon ?
        <options.Icon />
      : getIcon(type)}
      <div className="flex-1">
        <p className="text-sm font-bold">{options.title}</p>
        {options.description && (
          <p className="text-xs mt-1">{options.description}</p>
        )}
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          options.onAction?.();
          toast.dismiss(t);
        }}
        className="cursor-pointer"
      >
        <X size={24} />
      </Button>
    </div>
  ));
}

export const Toast = {
  success: (options: ToastOptions) => show("success", options),
  error: (options: ToastOptions) => show("error", options),
  info: (options: ToastOptions) => show("info", options),
  warning: (options: ToastOptions) => show("warning", options),
};
