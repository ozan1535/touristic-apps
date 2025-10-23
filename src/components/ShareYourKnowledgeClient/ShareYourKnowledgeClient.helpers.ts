import { Dispatch } from "react";
import { ITipForm } from "./ShareYourKnowledgeClient.types";

// TODO: Fix type
export const validateForm = (
  form: ITipForm,
  setError: Dispatch<React.SetStateAction<string>>,
  shareYourKnowledgeTranslation: any
): boolean => {
  if (!form.country.trim()) {
    setError(shareYourKnowledgeTranslation("errorCountry"));
    return false;
  }
  if (!form.appName.trim()) {
    setError(shareYourKnowledgeTranslation("errorAppName"));
    return false;
  }
  if (form.userTip.trim().length < 20) {
    setError(shareYourKnowledgeTranslation("errorTip"));
    return false;
  }
  return true;
};
