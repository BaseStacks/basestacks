import React, { createContext, useContext, useState } from "react";
import { ChevronLeft, TriangleAlert } from "lucide-react";
import { Button } from "./primitives/button";
import type { HTMLProps } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/overlay/dialog";
import { cn } from "@/lib/utils";

type DialogContextType = {
  readonly openDialog: (
    item: DialogContent,
    onConfirm: (item: DialogContent) => void
  ) => void;
  readonly closeDialog: () => void;
};
type ButtonList = {
  type?: "cancel" | "submit" | "button";
  label?: string;
  onClick?: () => void;
  icon?: React.ComponentType<HTMLProps<SVGSVGElement>>;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};
export interface DialogContent {
  readonly id?: string;
  readonly title?: string;
  readonly iconTitle?: React.ComponentType<HTMLProps<SVGSVGElement>>;
  readonly leftContent?: React.ReactNode;
  readonly content?: React.ReactNode;
  readonly showFooter?: boolean;
  readonly size?: "small" | "normal" | "large";
  readonly errorText?: string;
  readonly buttons?: Array<ButtonList>;
}
const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [dialogs, setDialogs] = useState<
    Array<{
      readonly item: DialogContent;
      readonly onConfirm: (item: DialogContent) => void;
    }>
  >([]);

  const openDialog = React.useCallback(
    (
      dialogItem: DialogContent,
      onConfirmCallback: (item: DialogContent) => void
    ) => {
      setDialogs((prev) => [
        ...prev,
        { item: dialogItem, onConfirm: onConfirmCallback },
      ]);
    },
    []
  );

  const closeDialog = React.useCallback(() => {
    setDialogs((prev) => prev.slice(0, -1));
  }, []);
  const contextValue = React.useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog]
  );

  const sizeClass = {
    small: "!max-w-lg",
    normal: "!max-w-screen-xl",
    large: "!max-w-screen-2xl",
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {dialogs.map(({ item, onConfirm }, index) => (
        <Dialog key={index} open onOpenChange={closeDialog}>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/30" />
            <DialogContent
              className={cn(
                sizeClass[item.size ?? "normal"],
                `p-0 gap-0 max-h-[80vh] h-full overflow-hidden`
              )}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onConfirm(item);
                  closeDialog();
                }}
                className="relative"
              >
                <DialogHeader className="p-4 border-b-1 h-[65px]">
                  <div className="flex items-center justify-between">
                    {item.leftContent ?
                      item.leftContent
                    : <div className="flex items-center gap-2">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              closeDialog();
                            }}
                          >
                            <ChevronLeft />
                          </Button>
                        )}
                        {item.iconTitle && <item.iconTitle />}
                        <DialogTitle className="text-lg font-semibold">
                          {item.title}
                        </DialogTitle>
                      </div>
                    }
                    <div className="flex items-center gap-2">
                      {!item.showFooter &&
                        item.buttons?.map((button, idx) =>
                          ButtonComponent(button, closeDialog, idx)
                        )}
                      <DialogClose asChild>
                        <Button variant="ghost" size="sm">
                          ✕
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogHeader>
                <div className="h-[calc(100%_-_65px)]">
                  {/* calc(100% - 65px): Chiều cao còn lại sau khi trừ header (65px) */}
                  <div
                    className={cn(
                      // max-h: 60vh - 69px (footer) => đảm bảo dialog không vượt quá 60% viewport và trừ chiều cao footer nếu có
                      "max-h-[calc(80vh_-_69px)] overflow-y-auto", // calc(60vh - 69px): Chiều cao tối đa của content khi có footer
                      item.showFooter ?
                        "h-[calc(100%_-_69px)]" // calc(100% - 69px): Chiều cao content trừ đi footer (69px)
                      : "h-full" // Nếu không có footer thì content chiếm toàn bộ chiều cao còn lại
                    )}
                  >
                    {item.content}
                  </div>
                  {item.showFooter && (
                    <DialogFooter className="p-4 border-t-1 flex sm:justify-between gap-2 h-[69px] w-full fixed bottom-0">
                      <div className="text-sm text-[#C86827] flex items-center gap-1">
                        <TriangleAlert size={20} />
                        <span className="ml-2">
                          {item.errorText ??
                            "Ensure database validity to prevent schema loss."}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.buttons?.map((button, idx) =>
                          ButtonComponent(button, closeDialog, idx)
                        )}
                      </div>
                    </DialogFooter>
                  )}
                </div>
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      ))}
    </DialogContext.Provider>
  );
}

const ButtonComponent = (
  {
    type = "button",
    label,
    onClick,
    disabled = false,
    loading = false,
    className = "",
    variant,
  }: ButtonList,
  closeDialog,
  key
) => {
  return (
    type === "cancel" ?
      <Button
        key={key}
        variant="secondary"
        type="button"
        disabled={disabled}
        onClick={closeDialog}
        className={cn(className, loading && "loading", "btn btn-outline")}
      >
        {label ?? "cancel"}
      </Button>
    : type == "submit" ?
      <Button
        key={key}
        type="submit"
        variant={variant ?? "default"}
        disabled={disabled}
        className={cn(className, loading && "loading")}
      >
        {label ?? "Save"}
      </Button>
    : <Button
        key={key}
        type="button"
        variant="secondary"
        onClick={onClick}
        disabled={disabled}
        className={cn(className, loading && "loading")}
      >
        {label}
      </Button>
  );
};

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
}
