import { createContext, useContext, useState } from "react";
import { Input } from "./primitives/input";
import { Button } from "./primitives/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/overlay/dialog";

type DeleteModalContextType = {
  openModal: (
    item: DeleteModalContent,
    onConfirm: (item: DeleteModalContent) => void
  ) => void;
};
export type DeleteModalContent<T = any> = {
  id?: string;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  value?: T;
};
const DeleteModalContext = createContext<DeleteModalContextType | null>(null);

export function DeleteModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<DeleteModalContent | null>();
  const [onConfirm, setOnConfirm] = useState<((item: any) => void) | null>(
    null
  );

  const openModal = (
    item: DeleteModalContent,
    onConfirmCallback: (item: any) => void
  ) => {
    setItem(item);
    setOnConfirm(() => onConfirmCallback);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setItem(null);
    setOnConfirm(null);
  };

  return (
    <DeleteModalContext.Provider value={{ openModal }}>
      {children}
      <Dialog open={open} onOpenChange={closeDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="p-6 rounded-lg border border-destructive max-w-md">
            <h2 className="text-lg text-destructive font-semibold mb-2">
              {item?.title ? item.title : "Xác nhận xóa?"}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {item?.description ?
                item.description
              : "Hành động này không thể hoàn tác."}
            </p>
            {item?.value && <Input disabled value={item.value} />}
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={closeDialog}
                className="btn btn-outline"
              >
                {item?.cancelText ? item.cancelText : "Cancel"}
              </Button>
              <Button
                onClick={() => {
                  onConfirm?.(item);
                  closeDialog();
                }}
                className="bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50 disabled:pointer-events-none"
              >
                {item?.confirmText ? item.confirmText : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </DeleteModalContext.Provider>
  );
}

export function useDeleteModal() {
  const context = useContext(DeleteModalContext);
  if (!context) {
    throw new Error("useDeleteModal must be used within DeleteModalProvider");
  }
  return context;
}
