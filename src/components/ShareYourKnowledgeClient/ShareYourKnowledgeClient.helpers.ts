import { Dispatch } from "react";
import { ITipForm } from "./ShareYourKnowledgeClient.types";
import { supabase } from "@/lib/supabase/client";

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
  if (form.userTip.trim().length < 10) {
    setError(shareYourKnowledgeTranslation("errorTip"));
    return false;
  }
  return true;
};

export const MAX_FILE_SIZE = 1048576;
export const ALLOWED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  showFileSizeError,
  showFileTypeError,
  setForm,
  setPreviewUrl
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > MAX_FILE_SIZE) {
    showFileSizeError();
    e.target.value = "";
    return;
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    showFileTypeError();
    e.target.value = "";
    return;
  }

  setForm((prev) => ({ ...prev, appLogo: file }));

  const reader = new FileReader();
  reader.onloadend = () => {
    setPreviewUrl(reader.result as string);
  };
  reader.readAsDataURL(file);
};

export const handleSubmit = async (
  setError,
  setSuccess,
  form,
  t,
  user,
  showLoginRequired,
  setIsLoading,
  sortedCountries,
  setForm,
  fileInputRef
) => {
  setError("");
  setSuccess(false);

  if (!validateForm(form, setError, t)) return;

  if (!user) {
    showLoginRequired();
    return;
  }

  setIsLoading(true);

  try {
    const countryCca2 = sortedCountries
      .find((item) => item.label === form.country)
      ?.cca2.toLowerCase();

    if (!countryCca2) {
      setError("Invalid country selection");
      return;
    }

    let logoUrl: string | null = null;
    if (form.appLogo) {
      logoUrl = await uploadFileToStorage(form.appLogo, "contribute");
      if (!logoUrl) {
        setError("Failed to upload logo. Please try again.");
        return;
      }
    }

    const { error: insertError } = await supabase.from("contributions").insert({
      country: countryCca2,
      app_name: form.appName,
      description: form.userTip,
      app_logo: logoUrl,
      user_id: user.id,
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      setError("Failed to submit your contribution. Please try again.");
      return;
    }

    setSuccess(true);
    setForm({
      country: "",
      appName: "",
      userTip: "",
      appLogo: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setTimeout(() => setSuccess(false), 5000);
  } catch (err) {
    console.error("Submission error:", err);
    setError("An unexpected error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

export const uploadFileToStorage = async (
  file: File,
  bucketName: string
): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (err) {
    console.error("File upload failed:", err);
    return null;
  }
};
