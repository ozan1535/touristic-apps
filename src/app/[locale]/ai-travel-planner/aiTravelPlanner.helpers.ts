import { Dispatch, SetStateAction } from "react";
import { ITripForm } from "./types";
import { GoogleGenAI } from "@google/genai";

export const validateForm = (
  form: ITripForm,
  setError: Dispatch<SetStateAction<string>>
): boolean => {
  if (!form.destination.trim()) {
    setError("Please enter a destination");
    return false;
  }
  if (form.duration <= 0) {
    setError("Please enter a valid duration");
    return false;
  }
  return true;
};

export const getAiResponse = async (
  form: ITripForm,
  setError: Dispatch<React.SetStateAction<string>>,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>,
  setData: Dispatch<React.SetStateAction<string>>,
  getAiPrompt: (locale: "en" | "tr", form: ITripForm) => string,
  locale: "en" | "tr",
  handleAddData: (response: string) => void
) => {
  if (!validateForm(form, setError)) return;

  setIsLoading(true);
  setError("");
  setData("");

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "",
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: getAiPrompt(locale, form),
      config: {
        systemInstruction: `You are an expert travel planner. Create detailed day-by-day itineraries that include:
    - Recommended cities and neighborhoods
    - Must-see attractions and hidden gems
    - Local dining recommendations
    - Transportation tips
    - Estimated costs and timing
    - Cultural insights and practical tips

    Format your response in clean, semantic HTML with proper headings (h3, h4), paragraphs, and lists. Make it visually scannable and user-friendly.`,
      },
    });

    setData(response.text || "");

    handleAddData(response.text as string);
  } catch (err) {
    setError(
      "Failed to generate itinerary. Please check your API key and try again."
    );
    console.error("AI Generation Error:", err);
  } finally {
    setIsLoading(false);
  }
};
