import React, { Dispatch, SetStateAction, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CustomDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: ReactNode;
  contentClassName?: string;
}

export default function CustomDialog({
  open,
  setOpen,
  title = "",
  children,
  contentClassName = "",
}: CustomDialogProps) {
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={`w-full ${contentClassName}`}>
        <DialogHeader>
          <DialogTitle>{title || ""}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
