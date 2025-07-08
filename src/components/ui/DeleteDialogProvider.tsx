import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Input } from "./primitives/input";
import { Button } from "./primitives/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/overlay/dialog";

type DeleteModalContextType = {
  readonly openDeleteModal: (
    content: DeleteModalContent,
    onConfirm: (content: DeleteModalContent) => void
  ) => void;
};
export type DeleteModalContent<T = any> = {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly value?: T;
};
const DeleteModalContext = createContext<DeleteModalContextType | null>(null);

export function DeleteModalProvider({
  children,
}: Readonly<{
  readonly children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<DeleteModalContent | null>(null);
  const [onConfirm, setOnConfirm] = useState<((content: any) => void) | null>(
    null
  );

  const openDeleteModal = useCallback(
    (
      nextContent: DeleteModalContent,
      onConfirmCallback: (content: any) => void
    ) => {
      setContent(nextContent);
      setOnConfirm(() => onConfirmCallback);
      setOpen(true);
    },
    []
  );

  const closeDeleteDialog = () => {
    setOpen(false);
    setContent(null);
    setOnConfirm(null);
  };

  const contextValue = useMemo(() => ({ openDeleteModal }), [openDeleteModal]);

  return (
    <DeleteModalContext.Provider value={contextValue}>
      {children}
      <Dialog open={open} onOpenChange={closeDeleteDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="p-6 rounded-lg border border-destructive max-w-md">
            <h2 className="text-lg text-destructive font-semibold mb-2">
              {content?.title ?? "Xác nhận xóa?"}
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              {content?.description ?? "Hành động này không thể hoàn tác."}
            </p>
            {content?.value && <Input disabled value={content.value} />}
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={closeDeleteDialog}
                className="btn btn-outline"
              >
                {content?.cancelText ?? "Cancel"}
              </Button>
              <Button
                onClick={() => {
                  onConfirm?.(content);
                  closeDeleteDialog();
                }}
                className="bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50 disabled:pointer-events-none"
              >
                {content?.confirmText ?? "Delete"}
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
