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
        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 mr-3">
          <PencilLine className="text-purple-300" size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{t("subtitle")}</p>
        </div>
      </div>

      {success && (
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/50 rounded-xl px-4 py-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="p-1 bg-green-500/20 rounded-lg">
            <CheckCircle2 className="text-green-300 flex-shrink-0" size={20} />
          </div>
          <div>
            <p className="font-semibold text-green-300">{t("successTitle")}</p>
            <p className="text-sm mt-1 text-green-200">{t("successMessage")}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/50 rounded-xl px-4 py-4 mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="p-1 bg-red-500/20 rounded-lg">
            <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
          </div>
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <Label
            htmlFor="country"
            className="text-gray-200 mb-3 flex items-center gap-2 font-semibold"
          >
            <Earth size={18} className="text-purple-400" />
            <span>{t("country")}</span>
            <span className="text-red-400">*</span>
          </Label>
          <SelectComponent
            canShowAll={false}
            categories={countryNames}
            handleValueChange={(selection) =>
              handleInputChange("country", selection, setForm, setError)
            }
            customStyle="w-full border-purple-400/30 bg-slate-700/20 hover:bg-slate-700/30"
            customPlaceholder={t("countryPlaceholder")}
          />
        </div>

        <div>
          <Label
            htmlFor="appName"
            className="text-gray-200 mb-3 flex items-center gap-2 font-semibold"
          >
            <LayoutGrid size={18} className="text-purple-400" />
            <span>{t("appName")}</span>
            <span className="text-red-400">*</span>
          </Label>
          <Input
            id="appName"
            type="text"
            placeholder={t("appNamePlaceholder")}
            className="bg-slate-700/20 border-purple-400/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 h-12"
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
            className="text-gray-200 mb-3 flex items-center gap-2 font-semibold"
          >
            <Heart size={18} className="text-purple-400" />
            <span>{t("tip")}</span>
            <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="tip"
            placeholder={t("tipPlaceholder")}
            className="bg-slate-700/20 border-purple-400/30 text-gray-100 placeholder:text-gray-500 focus:border-purple-400 min-h-[150px] resize-y"
            onChange={(e) =>
              handleInputChange("userTip", e.target.value, setForm, setError)
            }
            value={form.userTip}
            disabled={isLoading}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 text-xs">
              {form.userTip.length} {t("character")}
            </p>
            <p className="text-gray-500 text-xs">Minimum 20</p>
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
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
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
