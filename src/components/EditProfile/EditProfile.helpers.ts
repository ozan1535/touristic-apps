import { supabase } from "@/lib/supabase/client";
import { uploadFileToStorage } from "../ShareYourKnowledgeClient/ShareYourKnowledgeClient.helpers";
import {
  InvalidValidationParams,
  IUpdateProfileParams,
  IUpdateResult,
  IValidationResult,
} from "./EditProfile.types";

async function isUsernameAvailable(
  username: string,
  currentKindeUserId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("kinde_user_id")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      console.error("Username check error:", error);
      return false;
    }

    return !data || data.kinde_user_id === currentKindeUserId;
  } catch (err) {
    console.error("Username availability check failed:", err);
    return false;
  }
}

export async function validateProfileForm({
  formData,
  originalUsername,
  kindeUserId,
}: InvalidValidationParams): Promise<IValidationResult> {
  if (!formData.name.trim()) {
    return { isValid: false, error: "Name is required" };
  }

  if (formData.name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  }

  if (formData.name.length > 50) {
    return { isValid: false, error: "Name must be less than 50 characters" };
  }

  if (!formData.username.trim()) {
    return { isValid: false, error: "Username is required" };
  }

  if (formData.username.length < 5) {
    return { isValid: false, error: "Username must be at least 5 characters" };
  }

  if (formData.username.length > 20) {
    return {
      isValid: false,
      error: "Username must be less than 20 characters",
    };
  }

  if (!/^[a-z0-9_]+$/.test(formData.username)) {
    return {
      isValid: false,
      error:
        "Username can only contain lowercase letters, numbers, and underscores",
    };
  }

  if (formData.username !== originalUsername) {
    const available = await isUsernameAvailable(formData.username, kindeUserId);
    if (!available) {
      return { isValid: false, error: "Username is already taken" };
    }
  }

  if (formData.bio.length > 150) {
    return { isValid: false, error: "Bio must be less than 150 characters" };
  }

  return { isValid: true };
}

export async function updateUserProfile({
  formData,
  originalPicture,
  kindeUserId,
}: IUpdateProfileParams): Promise<IUpdateResult> {
  try {
    let pictureUrl: string | null = originalPicture;

    if (formData.picture instanceof File) {
      const uploadedUrl = await uploadFileToStorage(
        formData.picture,
        "profile_pictures"
      );

      if (!uploadedUrl) {
        return {
          success: false,
          error: "Failed to upload profile picture. Please try again.",
        };
      }

      pictureUrl = uploadedUrl;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name: formData.name.trim(),
        username: formData.username.trim(),
        picture: pictureUrl,
        bio: formData.bio.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("kinde_user_id", kindeUserId);

    if (error) {
      console.error("Profile update error:", error);
      return {
        success: false,
        error: "Failed to update profile. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Update profile exception:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export const handleSave = async (
  e: React.FormEvent,
  setError,
  setSuccess,
  setIsLoading,
  formData,
  userData,
  router,
  onClose
) => {
  e.preventDefault();

  setError("");
  setSuccess(false);
  setIsLoading(true);

  try {
    const validation = await validateProfileForm({
      formData,
      originalUsername: userData.username,
      kindeUserId: userData.kinde_user_id,
    });

    if (!validation.isValid) {
      setError(validation.error || "Validation failed");
      setIsLoading(false);
      return;
    }

    const result = await updateUserProfile({
      formData,
      originalPicture: userData.picture,
      kindeUserId: userData.kinde_user_id,
    });

    if (!result.success) {
      setError(result.error || "Failed to update profile");
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
    if (formData.username !== userData.username) {
      setTimeout(() => {
        router.push(`/user/${formData.username}`);
        router.refresh();
      }, 1000);
    } else {
      setTimeout(() => {
        router.refresh();
        onClose();
      }, 1000);
    }
  } catch (err) {
    console.error("Profile update error:", err);
    setError("An unexpected error occurred. Please try again.");
    setIsLoading(false);
  }
};
