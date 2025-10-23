/* "use client";
import { Earth, Heart, LayoutGrid } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getSortedCountries } from "../SearchCountry/SearchCountry.helpers";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "../SelectComponent/SelectComponent";

function ShareYourKnowledgeClient() {
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  const sortedCountries = getSortedCountries(locale);
  const arrayOfCountries = sortedCountries.map((item) => item.label);

  const [form, setForm] = useState({
    country: "",
    appName: "",
    userTip: "",
  });

  const handleUserTip = () => {
    const countryCca2 = sortedCountries
      .find((item) => item.label === form.country)
      ?.cca2.toLowerCase();

    console.log(form, countryCca2, "ehehe");
  };
  return (
    <div className="space-y-4">
      <div>
        <Label
          htmlFor="country"
          className="text-gray-200 mb-2 flex items-center"
        >
          <Earth size={16} />
          Country
        </Label>
        <SelectComponent
          canShowAll={false}
          categories={arrayOfCountries}
          handleValueChange={(selection) => {
            setForm((prev) => ({ ...prev, country: selection }));
          }}
          customStyle="w-full border-purple-500/30"
          customPlaceholder="Select the country for your tip"
        />
      </div>

      <div>
        <Label htmlFor="name" className="text-gray-200 mb-2 flex items-center">
          <LayoutGrid size={16} />
          App Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Japan Taxi"
          className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, appName: e.target.value }))
          }
          value={form.appName || ""}
        />
      </div>

      <div>
        <Label htmlFor="tip" className="text-gray-200 mb-2 flex items-center">
          <Heart size={16} />
          Your Tip
        </Label>
        <Textarea
          id="tip"
          placeholder="e.g. 'I used this app and it really helped me get around Tokyo easily!'"
          className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 min-h-[80px]"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, userTip: e.target.value }))
          }
          value={form.userTip}
        />
      </div>

      
      <Button
        // onClick={() =>
        //   getAiResponse(
        //     form,
        //     setError,
        //     setIsLoading,
        //     setData,
        //     getAiPrompt,
        //     locale
        //   )
        // }
        // disabled={isLoading}
        onClick={handleUserTip}
        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Your Tip
      </Button>
    </div>
  );
}

export default ShareYourKnowledgeClient;
 */

"use client";
import {
  Earth,
  Heart,
  LayoutGrid,
  Send,
  CheckCircle2,
  AlertCircle,
  PencilLine,
} from "lucide-react";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { getSortedCountries } from "../SearchCountry/SearchCountry.helpers";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "../SelectComponent/SelectComponent";
import { ITipForm } from "./ShareYourKnowledgeClient.types";
import { useTranslations } from "next-intl";
import { validateForm } from "./ShareYourKnowledgeClient.helpers";

function ShareYourKnowledgeClient() {
  const shareYourKnowledgeTranslation = useTranslations("ShareYourKnowledge");
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  const sortedCountries = getSortedCountries(locale);
  const arrayOfCountries = sortedCountries.map((item) => item.label);

  const [form, setForm] = useState<ITipForm>({
    country: "",
    appName: "",
    userTip: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!validateForm(form, setError, shareYourKnowledgeTranslation)) return;

    setIsLoading(true);

    try {
      const countryCca2 = sortedCountries
        .find((item) => item.label === form.country)
        ?.cca2.toLowerCase();

      // TODO: Replace with actual API call
      // await submitUserTip({
      //   ...form,
      //   countryCca2,
      //   locale,
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setForm({
        country: "",
        appName: "",
        userTip: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        "Failed to submit your tip. Please try again or contact support."
      );
      console.error("Submission error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ITipForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <PencilLine className="mr-3 text-purple-400" size={28} />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
            {shareYourKnowledgeTranslation("title")}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {shareYourKnowledgeTranslation("subtitle")}
          </p>
        </div>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-300 px-4 py-4 rounded-lg mb-6 flex items-start gap-3">
          <CheckCircle2 className="flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold">
              {shareYourKnowledgeTranslation("successTitle")}
            </p>
            <p className="text-sm mt-1">
              {shareYourKnowledgeTranslation("successMessage")}
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-4 rounded-lg mb-6 flex items-start gap-3">
          <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <Label
            htmlFor="country"
            className="text-gray-200 mb-2 flex items-center gap-2"
          >
            <Earth size={18} className="text-purple-400" />
            <span className="font-semibold">
              {shareYourKnowledgeTranslation("country")}
            </span>
            <span className="text-red-400">*</span>
          </Label>
          <SelectComponent
            canShowAll={false}
            categories={arrayOfCountries}
            handleValueChange={(selection) =>
              handleInputChange("country", selection)
            }
            customStyle="w-full border-purple-500/30 bg-slate-800/50 hover:bg-slate-800/70"
            customPlaceholder={shareYourKnowledgeTranslation(
              "countryPlaceholder"
            )}
          />
        </div>

        <div>
          <Label
            htmlFor="appName"
            className="text-gray-200 mb-2 flex items-center gap-2"
          >
            <LayoutGrid size={18} className="text-purple-400" />
            <span className="font-semibold">
              {shareYourKnowledgeTranslation("appName")}
            </span>
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="appName"
            type="text"
            placeholder={shareYourKnowledgeTranslation("appNamePlaceholder")}
            className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 h-12"
            onChange={(e) => handleInputChange("appName", e.target.value)}
            value={form.appName}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label
            htmlFor="tip"
            className="text-gray-200 mb-2 flex items-center gap-2"
          >
            <Heart size={18} className="text-purple-400" />
            <span className="font-semibold">
              {shareYourKnowledgeTranslation("tip")}
            </span>
            <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="tip"
            placeholder={shareYourKnowledgeTranslation("tipPlaceholder")}
            className="bg-slate-800/50 border-purple-500/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 min-h-[150px] resize-y"
            onChange={(e) => handleInputChange("userTip", e.target.value)}
            value={form.userTip}
            disabled={isLoading}
          />
          <p className="text-gray-500 text-xs mt-2">
            {form.userTip.length} {shareYourKnowledgeTranslation("character")}{" "}
            (minimum 20)
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
              {shareYourKnowledgeTranslation("submitting")}
            </>
          ) : (
            <>
              <Send size={20} className="mr-2" />
              {shareYourKnowledgeTranslation("submit")}
            </>
          )}
        </Button>

        {/* Login Notice (if needed) */}
        {/* <div className="text-center text-gray-400 text-sm mt-4">
          <AlertCircle size={16} className="inline mr-2" />
          {shareYourKnowledgeTranslationloginRequired}
        </div> */}
      </div>
    </div>
  );
}

export default ShareYourKnowledgeClient;
