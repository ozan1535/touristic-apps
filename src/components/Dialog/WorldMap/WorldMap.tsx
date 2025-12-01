import RotatingWorldChart from "@/components/RotatingWorldChart/RotatingWorldChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";

function WorldMap({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const homePageTranslation = useTranslations("HomePage");

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent className="w-full">
        <DialogTitle></DialogTitle>

        <RotatingWorldChart
          clickShortText={homePageTranslation("clickShortText")}
        />
      </DialogContent>
    </Dialog>
  );
}

export default WorldMap;
