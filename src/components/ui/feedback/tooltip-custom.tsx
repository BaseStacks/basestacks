import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/feedback/tooltip";

interface TooltipCustomProps {
  children?: React.ReactNode;
  value?: string;
}

export function TooltipCustom({ children, value }: TooltipCustomProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{value}</p>
      </TooltipContent>
    </Tooltip>
  );
}
