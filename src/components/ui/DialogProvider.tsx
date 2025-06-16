import React, { createContext, useContext, useState } from "react";
import { Button } from "./primitives/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/overlay/dialog";

type DialogContextType = {
  readonly openDialog: (
    item: DialogContent,
    onConfirm: (item: DialogContent) => void
  ) => void;
  readonly closeDialog: () => void;
};
export interface DialogContent {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly value?: React.ReactNode;
}
const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { readonly children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<DialogContent | null>(null);
  const [onConfirm, setOnConfirm] = useState<((item: any) => void) | null>(
    null
  );

  const openDialog = React.useCallback(
    (
      dialogItem: DialogContent,
      onConfirmCallback: (item: any) => void
    ) => {
      setItem(dialogItem);
      setOnConfirm(() => onConfirmCallback);
      setOpen(true);
    },
    [setItem, setOnConfirm, setOpen]
  );

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    setItem(null);
    setOnConfirm(null);
  }, [setOpen, setItem, setOnConfirm]);

  const contextValue = React.useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="p-6 rounded-lg border max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onConfirm?.(item);
                closeDialog();
              }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold mb-2">{item?.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">
                {item?.description}
              </p>
              {item?.value}
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={closeDialog}
                  className="btn btn-outline"
                >
                  {item?.cancelText ?? "Cancel"}
                </Button>
                <Button type="submit">
                  {item?.confirmText ?? "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
}
