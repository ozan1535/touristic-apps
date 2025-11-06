"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  Zap,
  Plane,
  Calendar,
  Heart,
  Wallet,
  Compass,
  NotepadText,
  AlertCircle,
} from "lucide-react";
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
    details: "",
  });
  const { destination, duration, interests, budget, travelStyle, details } =
    form;
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
        details,
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
      <div className="border border-indigo-200 rounded-xl p-6 bg-blue-50 backdrop-blur-sm shadow-xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl border border-indigo-200 mr-3">
            <Plane className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {aiTravelPlannerTranslation("preferences")}
          </h2>
        </div>
        <p className="text-slate-600 mb-6 text-sm">
          {aiTravelPlannerTranslation("tellUs")}
        </p>

        {error && (
          <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/50 rounded-xl px-4 py-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="p-1 bg-red-500 rounded-lg">
              <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
            </div>
            <p className="text-sm text-rose-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="destination"
              className="text-slate-800 mb-2 flex items-center gap-2 font-semibold"
            >
              <Compass size={18} className="text-blue-500" />
              {aiTravelPlannerTranslation("destination")}
            </Label>
            <Input
              id="destination"
              placeholder={aiTravelPlannerTranslation("destinationPlaceholder")}
              className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400"
              onChange={handleChange("destination")}
              value={form.destination}
            />
          </div>

          <div>
            <Label
              htmlFor="duration"
              className="text-slate-800 mb-2 flex items-center gap-2 font-semibold"
            >
              <Calendar size={18} className="text-blue-500" />
              {aiTravelPlannerTranslation("duration")}
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="10"
              placeholder="5"
              className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400"
              onChange={handleChange("duration")}
              value={form.duration || ""}
            />
          </div>

          <div>
            <Label
              htmlFor="interests"
              className="text-slate-800 mb-2 flex items-center gap-2 font-semibold"
            >
              <Heart size={18} className="text-blue-500" />
              {aiTravelPlannerTranslation("interests")}
            </Label>
            <Textarea
              id="interests"
              placeholder={aiTravelPlannerTranslation("interestsPlaceholder")}
              className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400 min-h-[80px]"
              onChange={handleChange("interests")}
              value={form.interests}
            />
          </div>

          <div>
            <Label
              htmlFor="details"
              className="text-slate-800 mb-2 flex items-center gap-2 font-semibold"
            >
              <NotepadText size={18} className="text-blue-500" />
              {aiTravelPlannerTranslation("details")}
            </Label>
            <Textarea
              id="details"
              placeholder={aiTravelPlannerTranslation("details")}
              className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400 min-h-[80px]"
              onChange={handleChange("details")}
              value={form.details}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="budget"
                className="text-slate-800 mb-2 flex items-center gap-2 font-semibold"
              >
                <Wallet size={18} className="text-blue-500" />
                {aiTravelPlannerTranslation("budget")}
              </Label>
              <Input
                id="budget"
                placeholder={aiTravelPlannerTranslation("budgetPlaceholder")}
                className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400"
                onChange={handleChange("budget")}
                value={form.budget}
              />
            </div>
            <div>
              <Label
                htmlFor="travelStyle"
                className="text-slate-800 mb-2 flex items-center gap-2 font-semibold"
              >
                <Plane size={18} className="text-blue-500" />
                {aiTravelPlannerTranslation("travelStyle")}
              </Label>
              <Input
                id="travelStyle"
                placeholder={aiTravelPlannerTranslation(
                  "travelStylePlaceholder"
                )}
                className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400"
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
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
          >
            {isLoading ? (
              <>
                <Zap className="mr-2 animate-pulse" size={20} />
                {aiTravelPlannerTranslation("generating")}
              </>
            ) : (
              <>
                <Zap size={20} className="mr-2" />
                {aiTravelPlannerTranslation("generateItinerary")}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="border border-indigo-200 rounded-xl p-6 bg-blue-50 backdrop-blur-sm shadow-xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          {aiTravelPlannerTranslation("yourItinerary")}
        </h2>
        <p className="text-slate-600 mb-6 text-sm">
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
                className={`h-4 bg-blue-100 ${
                  i % 3 === 0 ? "w-3/4" : i % 3 === 1 ? "w-full" : "w-5/6"
                }`}
              />
            ))}
          </div>
        ) : data ? (
          <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <div
              className="prose prose-indigo max-w-none prose-headings:text-indigo-700 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-indigo-600"
              dangerouslySetInnerHTML={{ __html: data }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <div className="text-center">
              <Compass size={48} className="mx-auto mb-4 text-blue-500" />
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
          background: rgba(191, 219, 254, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.4);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.6);
        }
      `}</style>
    </div>
  );
}

export default TravelPlannerClient;
