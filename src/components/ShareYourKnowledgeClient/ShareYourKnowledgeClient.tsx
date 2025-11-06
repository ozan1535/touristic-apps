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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getSortedCountries } from "../SearchCountry/SearchCountry.helpers";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "../SelectComponent/SelectComponent";
import { handleSubmit } from "./ShareYourKnowledgeClient.helpers";
import AlertComponent from "../AlertComponent/AlertComponent";
import { ITipForm } from "./ShareYourKnowledgeClient.types";
import { useAlert } from "@/hooks/useAlert";
import ImageUpload from "../ImageUpload/ImageUpload";
import { handleInputChange } from "@/lib/helpers";

function ShareYourKnowledgeClient() {
  const t = useTranslations("ShareYourKnowledge");
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sortedCountries = getSortedCountries(locale);
  const countryNames = sortedCountries.map((item) => item.label);

  const [form, setForm] = useState<ITipForm>({
    country: "",
    appName: "",
    userTip: "",
    appLogo: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    alert,
    hideAlert,
    showLoginRequired,
    showFileSizeError,
    showFileTypeError,
  } = useAlert();

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl border border-indigo-200 mr-3">
          <PencilLine color="white" size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-sm mt-1">{t("subtitle")}</p>
        </div>
      </div>

      {success && (
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-indigo-300 rounded-xl px-4 py-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="p-1 bg-indigo-100 rounded-lg">
            <CheckCircle2 className="text-indigo-600 flex-shrink-0" size={20} />
          </div>
          <div>
            <p className="font-semibold text-indigo-600">{t("successTitle")}</p>
            <p className="text-sm mt-1 text-indigo-500">{t("successMessage")}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/50 rounded-xl px-4 py-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="p-1 bg-red-500 rounded-lg">
            <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
          </div>
          <p className="text-sm text-rose-600">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <Label
            htmlFor="country"
            className="text-slate-800 mb-3 flex items-center gap-2 font-semibold"
          >
            <Earth size={18} className="text-blue-300" />
            <span>{t("country")}</span>
            <span className="text-red-400">*</span>
          </Label>
          <SelectComponent
            canShowAll={false}
            categories={countryNames}
            handleValueChange={(selection) =>
              handleInputChange("country", selection, setForm, setError)
            }
            customStyle="w-full border-indigo-200 bg-blue-50 hover:bg-blue-50"
            customPlaceholder={t("countryPlaceholder")}
          />
        </div>

        <div>
          <Label
            htmlFor="appName"
            className="text-slate-800 mb-3 flex items-center gap-2 font-semibold"
          >
            <LayoutGrid size={18} className="text-blue-300" />
            <span>{t("appName")}</span>
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="appName"
            type="text"
            placeholder={t("appNamePlaceholder")}
            className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400 h-12"
            onChange={(e) =>
              handleInputChange("appName", e.target.value, setForm, setError)
            }
            value={form.appName}
            disabled={isLoading}
          />
        </div>

        <ImageUpload
          onFileSelect={(file) =>
            setForm((prev) => ({ ...prev, appLogo: file }))
          }
          isLoading={isLoading}
          onFileSizeError={showFileSizeError}
          onFileTypeError={showFileTypeError}
        />

        <div>
          <Label
            htmlFor="tip"
            className="text-slate-800 mb-3 flex items-center gap-2 font-semibold"
          >
            <Heart size={18} className="text-blue-300" />
            <span>{t("tip")}</span>
            <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="tip"
            placeholder={t("tipPlaceholder")}
            className="bg-blue-50 border-indigo-200 text-slate-900 placeholder:text-slate-500 focus:border-indigo-400 min-h-[150px] resize-y"
            onChange={(e) =>
              handleInputChange("userTip", e.target.value, setForm, setError)
            }
            value={form.userTip}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-slate-500 text-xs">
              {form.userTip.length} {t("character")}
            </p>
            <p className="text-slate-500 text-xs">Minimum 20</p>
          </div>
        </div>

        <Button
          onClick={() =>
            handleSubmit(
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
            )
          }
          disabled={isLoading}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
              {t("submitting")}
            </>
          ) : (
            <>
              <Send size={20} className="mr-2" />
              {t("submit")}
            </>
          )}
        </Button>
      </div>

      <AlertComponent
        open={alert.isOpen}
        title={alert.title}
        description={alert.description}
        handleCancel={hideAlert}
        cancelText="Cancel"
        href={alert.actionHref || ""}
        actionText={alert.actionText || ""}
        canShowAction={alert.showAction ?? true}
      />
    </div>
  );
}

export default ShareYourKnowledgeClient;
