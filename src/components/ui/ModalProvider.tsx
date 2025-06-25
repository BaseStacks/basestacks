import React, { createContext, useContext, useState } from "react";
import { Button } from "./primitives/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/overlay/dialog";
import { cn } from "@/lib/utils";

type ModalContextType = {
  readonly openModal: (
    item: ModalContent,
    onConfirm: (item: ModalContent) => void
  ) => void;
  readonly closeModal: () => void;
};
export interface ModalContent {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly content?: React.ReactNode;
  readonly size?: "small" | "normal" | "large" | "xl" | "full";
}
const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<ModalContent | null>(null);
  const [onConfirm, setOnConfirm] = useState<((item: any) => void) | null>(
    null
  );

  const openModal = React.useCallback(
    (dialogItem: ModalContent, onConfirmCallback: (item: any) => void) => {
      setItem(dialogItem);
      setOnConfirm(() => onConfirmCallback);
      setOpen(true);
    },
    [setItem, setOnConfirm, setOpen]
  );

  const closeModal = React.useCallback(() => {
    setOpen(false);
    setItem(null);
    setOnConfirm(null);
  }, [setOpen, setItem, setOnConfirm]);

  const contextValue = React.useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  const sizeClass = {
    small: "!max-w-sm",
    normal: "!max-w-xl",
    large: "!max-w-3xl",
    xl: "!max-w-screen-xl",
    full: "!max-w-screen-2xl",
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent
            className={cn(
              sizeClass[item?.size ?? "normal"],
              "p-6 rounded-lg border w-full"
            )}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onConfirm?.(item);
                closeModal();
              }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-lg font-semibold">{item?.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {item?.description}
                </p>
              </div>
              {item?.content}
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  {item?.cancelText ?? "Cancel"}
                </Button>
                <Button type="submit">{item?.confirmText ?? "Save"}</Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}
