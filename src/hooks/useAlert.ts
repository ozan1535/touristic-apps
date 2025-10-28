import { useState } from "react";
import { MAX_FILE_SIZE } from "@/components/ShareYourKnowledgeClient/ShareYourKnowledgeClient.helpers";
interface IAlertState {
  isOpen: boolean;
  title: string;
  description: string;
  actionHref?: string;
  actionText?: string;
  showAction?: boolean;
}

export function useAlert() {
  const [alert, setAlert] = useState<IAlertState>({
    isOpen: false,
    title: "",
    description: "",
    showAction: true,
  });

  const showAlert = (config: Omit<IAlertState, "isOpen">) => {
    setAlert({ ...config, isOpen: true });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, isOpen: false }));
  };

  const showLoginRequired = () => {
    showAlert({
      title: "Login Required",
      description: "You need to login to contribute to the community",
      actionHref: "/sign-in",
      actionText: "Login",
      showAction: true,
    });
  };

  const showFileSizeError = () => {
    showAlert({
      title: "File Too Large",
      description: `File size exceeds ${
        MAX_FILE_SIZE / 1048576
      }MB. Please choose a smaller file.`,
      showAction: false,
    });
  };

  const showFileTypeError = () => {
    showAlert({
      title: "Invalid File Type",
      description: "Please upload a PNG, JPEG, or WebP image.",
      showAction: false,
    });
  };

  return {
    alert,
    showAlert,
    hideAlert,
    showLoginRequired,
    showFileSizeError,
    showFileTypeError,
  };
}
