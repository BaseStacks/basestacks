import { Button } from "@/components/ui/primitives/button";
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

interface DialogCustomProps {
  buttonText: string;
  title?: string;
  subTitle?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  showClose?: boolean;
  showSubmit?: boolean;
  submitText?: string;
  children?: React.ReactNode;
}

export const DialogCustom = (props: DialogCustomProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{props.buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          {props.subTitle ?? (
            <DialogDescription>{props.subTitle}</DialogDescription>
          )}
        </DialogHeader>
        <div className="flex items-center gap-2">{props.children}</div>
        <DialogFooter className="sm:justify-end">
          {props.showClose ?? (
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          )}
          {props.showSubmit ?? (
            <Button type="submit" onClick={props.onSubmit} className="ml-2">
              {props.submitText ?? "Submit"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
