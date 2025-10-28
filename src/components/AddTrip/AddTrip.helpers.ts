import { supabase } from "@/lib/supabase/client";
import { uploadFileToStorage } from "../ShareYourKnowledgeClient/ShareYourKnowledgeClient.helpers";
import { IFormData } from "./AddTrip.types";

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateTripForm(formData: IFormData): ValidationResult {
  if (!formData.picture) {
    return { isValid: false, error: "Trip cover photo is required" };
  }

  if (!formData.country.trim()) {
    return { isValid: false, error: "Country is required" };
  }

  if (!formData.title.trim()) {
    return { isValid: false, error: "Trip title is required" };
  }

  if (formData.title.trim().length < 5) {
    return { isValid: false, error: "Title must be at least 5 characters" };
  }

  if (formData.title.length > 100) {
    return { isValid: false, error: "Title must be less than 100 characters" };
  }

  if (!formData.description.trim() || formData.description === "<p><br></p>") {
    return { isValid: false, error: "Trip description is required" };
  }

  const plainText = formData.description.replace(/<[^>]*>/g, "").trim();
  if (plainText.length < 20) {
    return {
      isValid: false,
      error: "Description must be at least 20 characters",
    };
  }

  return { isValid: true };
}

interface SaveTripParams {
  formData: {
    picture: File | string | null;
    country: string;
    title: string;
    description: string;
    countryCca2?: string;
  };
  originalPicture: string | null;
  userId: string;
  tripId?: string;
  mode: string;
}

interface SaveResult {
  success: boolean;
  error?: string;
}

export async function saveTripData({
  formData,
  originalPicture,
  userId,
  tripId,
  mode,
}: SaveTripParams): Promise<SaveResult> {
  try {
    let pictureUrl: string | null = originalPicture;

    // Upload new picture if file is provided
    if (formData.picture instanceof File) {
      const uploadedUrl = await uploadFileToStorage(formData.picture, "trips");

      if (!uploadedUrl) {
        return {
          success: false,
          error: "Failed to upload trip photo. Please try again.",
        };
      }

      pictureUrl = uploadedUrl;
    }

    const tripData = {
      picture: pictureUrl,
      country: formData.country,
      title: formData.title.trim(),
      description: formData.description,
      country_cca2: formData.countryCca2,
    };

    if (mode === "add") {
      // Insert new trip
      const { error } = await supabase.from("trips").insert({
        ...tripData,
        user_id: userId,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Trip insert error:", error);
        return {
          success: false,
          error: "Failed to add trip. Please try again.",
        };
      }
    } else {
      const { error } = await supabase
        .from("trips")
        .update(tripData)
        .eq("id", tripId)
        .eq("user_id", userId);

      if (error) {
        console.error("Trip update error:", error);
        return {
          success: false,
          error: "Failed to update trip. Please try again.",
        };
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Save trip exception:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
