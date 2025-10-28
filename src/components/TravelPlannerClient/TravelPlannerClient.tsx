"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Zap, Plane, Calendar, Heart, Wallet, Compass } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { getAiPrompt } from "@/lib/helpers";
import { ITripForm } from "@/app/[locale]/ai-travel-planner/types";
import { getAiResponse } from "@/app/[locale]/ai-travel-planner/aiTravelPlanner.helpers";
import { supabase } from "@/lib/supabase/client";

function TravelPlannerClient() {
  const aiTravelPlannerTranslation = useTranslations("AiTravelPlanner");

  const { locale } = useParams<{ locale: "en" | "tr" }>();
  const [form, setForm] = useState<ITripForm>({
    destination: "",
    duration: 0,
    interests: "",
    budget: "",
    travelStyle: "",
  });
  const { destination, duration, interests, budget, travelStyle } = form;
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const handleAddData = async (response: string) => {
    if (user) {
      const { error } = await supabase.from("ai_planner").insert({
        destination,
        duration,
        interests,
        budget,
        travel_style: travelStyle,
        user_id: user?.id,
        ai_response: response,
      });
    }
  };

  const handleChange =
    (field: keyof ITripForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = field === "duration" ? +e.target.value : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setError("");
    };
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="border border-purple-500/30 rounded-xl p-6 bg-slate-900/50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center mb-4">
          <Plane className="mr-2 text-purple-400" size={24} />
          <h2 className="text-2xl font-bold text-gray-100">
            {aiTravelPlannerTranslation("preferences")}
          </h2>
        </div>
        <p className="text-gray-400 mb-6 text-sm">
          {aiTravelPlannerTranslation("tellUs")}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="destination"
              className="text-gray-200 mb-2 flex items-center"
            >
              <Compass size={16} />
              {aiTravelPlannerTranslation("destination")}
            </Label>
            <Input
              id="destination"
              placeholder={aiTravelPlannerTranslation("destinationPlaceholder")}
              className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400"
              onChange={handleChange("destination")}
              value={form.destination}
            />
          </div>

          <div>
            <Label
              htmlFor="duration"
              className="text-gray-200 mb-2 flex items-center"
            >
              <Calendar size={16} />
              {aiTravelPlannerTranslation("duration")}
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="10"
              placeholder="5"
              className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400"
              onChange={handleChange("duration")}
              value={form.duration || ""}
            />
          </div>

          <div>
            <Label
              htmlFor="interests"
              className="text-gray-200 mb-2 flex items-center"
            >
              <Heart size={16} />
              {aiTravelPlannerTranslation("interests")}
            </Label>
            <Textarea
              id="interests"
              placeholder={aiTravelPlannerTranslation("interestsPlaceholder")}
              className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 min-h-[80px]"
              onChange={handleChange("interests")}
              value={form.interests}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="budget"
                className="text-gray-200 mb-2 flex items-center"
              >
                <Wallet size={16} />
                {aiTravelPlannerTranslation("budget")}
              </Label>
              <Input
                id="budget"
                placeholder={aiTravelPlannerTranslation("budgetPlaceholder")}
                className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400"
                onChange={handleChange("budget")}
                value={form.budget}
              />
            </div>
            <div>
              <Label
                htmlFor="travelStyle"
                className="text-gray-200 mb-2 flex items-center"
              >
                <Plane size={16} />
                {aiTravelPlannerTranslation("travelStyle")}
              </Label>
              <Input
                id="travelStyle"
                placeholder={aiTravelPlannerTranslation(
                  "travelStylePlaceholder"
                )}
                className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400"
                onChange={handleChange("travelStyle")}
                value={form.travelStyle}
              />
            </div>
          </div>

          <Button
            onClick={() =>
              getAiResponse(
                form,
                setError,
                setIsLoading,
                setData,
                getAiPrompt,
                locale,
                handleAddData
              )
            }
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Zap className="mr-2 animate-pulse" size={20} />
                {aiTravelPlannerTranslation("generating")}
              </>
            ) : (
              <>
                <Zap className="mr-2" size={20} />
                {aiTravelPlannerTranslation("generateItinerary")}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="border border-purple-500/30 rounded-xl p-6 bg-slate-900/50 backdrop-blur-sm shadow-xl">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">
          {aiTravelPlannerTranslation("yourItinerary")}
        </h2>
        <p className="text-gray-400 mb-6 text-sm">
          {isLoading
            ? `${aiTravelPlannerTranslation("craftingJourney")}`
            : data
            ? `${aiTravelPlannerTranslation("yourTravelPlan")}`
            : `${aiTravelPlannerTranslation("yourGeneratedPlan")}`}
        </p>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(12)].map((_, i) => (
              <Skeleton
                key={i}
                className={`h-4 bg-slate-700/50 ${
                  i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-full" : "w-5/6"
                }`}
              />
            ))}
          </div>
        ) : data ? (
          <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <div
              className="prose prose-invert prose-purple max-w-none prose-headings:text-purple-300 prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-purple-200"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <Compass size={48} className="mx-auto mb-4 opacity-50" />
              <p>{aiTravelPlannerTranslation("fillTheForm")}</p>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
}

export default TravelPlannerClient;
