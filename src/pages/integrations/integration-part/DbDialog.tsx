import { Button } from "../../../components/ui/primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlay/dialog";

interface DbDialogProps {
  readonly buttonClassName?: string;
  readonly dialogContent?: React.ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly rightContent?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly showSubmit?: boolean;
  readonly showFooter?: boolean;
  readonly width?: string;
}

export function DbDialog({
  buttonClassName,
  dialogContent,
  title,
  description,
  rightContent,
  children,
  showSubmit = false,
  showFooter = true,
  width,
}: DbDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={buttonClassName}>{children}</DialogTrigger>
      <DialogContent className={`p-0 ${width} gap-0`}>
        <DialogHeader className="p-4 border-b-1">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {description}
                </DialogDescription>
              )}
            </div>
            <div className="flex items-center gap-2">
              {rightContent}
              <DialogClose asChild>
                <Button variant="ghost" size="sm">
                  ✕
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
        {dialogContent}
        {showFooter && (
          <DialogFooter className="sm:justify-end p-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            {showSubmit && <Button type="button">Submit</Button>}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
