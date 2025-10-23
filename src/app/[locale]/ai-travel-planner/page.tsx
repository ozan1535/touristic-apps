/* "use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { getAiPrompt } from "@/lib/helpers";

const page = () => {
  const { locale }: { locale: "en" | "tr" } = useParams();
  const [form, setForm] = useState({
    destination: "",
    duration: 0,
    interests: "",
    budget: "",
    travelStyle: "",
  });

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === "duration" ? +e.target.value : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const getAiResponse = async () => {
    setIsLoading(true);
    const ai = new GoogleGenAI({
      apiKey: "AIzaSyCKOvr69SIXfuyyQSSK3AcF7dry70DSUSQ",
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: getAiPrompt(locale, form),
      config: {
        systemInstruction: `
    You are a travel planner. Based on the content you plan a travel day by day, you can recommend cities, where the user can see, what they can do etc.
    As your response will be seen directly to the user side, please make the text user-friendly and informative. The content must be in HTML format.`,
      },
    });

    setData(response.text as string);
    setIsLoading(false);
  };

  return (
    <div className="w-full p-10">
      <h1 className="flex items-center justify-center text-3xl md:text-5xl font-black text-center text-purple-primary">
        <Zap size={30} className="mr-3" />
        AI Travel Planner
      </h1>

      <p className="text-center text-secondary my-3 md:my-8">
        Craft your perfect itinerary in seconds. Our AI tool generates
        personalized travel routes based on your preferences.
      </p>

      <div className="w-full h-auto flex gap-5">
        <div className="w-1/2 border border-secondary rounded p-5 bg-[#040b21]">
          <h2 className="text-xl font-bold text-secondary mb-2">
            Trip Preferences
          </h2>
          <p className="text-gray-300 mb-4">Tell us about your dream trip.</p>

          <Label htmlFor="destination" className="text-secondary mb-1">
            Destination
          </Label>
          <Input
            id="destination"
            placeholder="e.g. Paris, France"
            className="text-secondary mb-4"
            onChange={handleChange("destination")}
          />

          <Label htmlFor="duration" className="text-secondary mb-1">
            Duration (in days)
          </Label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g. 5"
            className="text-secondary mb-4"
            onChange={handleChange("duration")}
          />

          <Label htmlFor="interests" className="text-secondary mb-1">
            Interests
          </Label>
          <Textarea
            id="interests"
            placeholder="e.g. History, Nature, Food"
            className="text-secondary mb-4"
            onChange={handleChange("interests")}
          />

          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor="budget" className="text-secondary mb-1">
                Budget
              </Label>
              <Input
                id="budget"
                placeholder="e.g. Medium"
                className="text-secondary mb-4"
                onChange={handleChange("budget")}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="travelStyle" className="text-secondary mb-1">
                Travel Style
              </Label>
              <Input
                id="travelStyle"
                placeholder="e.g. Comfort"
                className="text-secondary mb-4"
                onChange={handleChange("travelStyle")}
              />
            </div>
          </div>

          <Button
            onClick={getAiResponse}
            className="w-full mt-4 bg-purple-primary hover:bg-purple-600"
          >
            Generate Route
          </Button>
        </div>

        <div className="w-1/2 border border-secondary rounded p-5 bg-[#040b21]">
          <h2 className="text-xl font-bold text-secondary mb-2">
            Your Custom Itinerary
          </h2>
          <p className="text-gray-300 mb-4">
            Your generated travel plan will appear here.
          </p>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(12)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={`h-4 ${i % 2 === 0 ? "w-full" : "w-96"}`}
                />
              ))}
            </div>
          ) : (
            data && (
              <div className="w-full h-96 overflow-scroll">
                <div dangerouslySetInnerHTML={{ __html: data }} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default page; */

import React from "react";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import TravelPlannerClient from "@/components/TravelPlannerClient/TravelPlannerClient";

const TravelPlannerPage = () => {
  const aiTravelPlannerTranslation = useTranslations("AiTravelPlanner");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 md:p-10">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="flex items-center justify-center text-2xl md:text-5xl font-black text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          <Zap size={40} className="mr-3 text-purple-400" />
          {aiTravelPlannerTranslation("title")}
        </h1>
        <p className="text-center text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          {aiTravelPlannerTranslation("description")}
        </p>
      </div>
      <TravelPlannerClient />
    </div>
  );
};

export default TravelPlannerPage;
