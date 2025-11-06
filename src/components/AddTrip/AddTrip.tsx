"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Globe, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import QuillEditor from "../QuillEditor/QuillEditor";
import SelectComponent from "../SelectComponent/SelectComponent";
import { getSortedCountries } from "../SearchCountry/SearchCountry.helpers";
import { useParams, useRouter } from "next/navigation";
import { saveTripData, validateTripForm } from "./AddTrip.helpers";
import ImageUpload from "../ImageUpload/ImageUpload";
import { handleInputChange } from "@/lib/helpers";
import { IFormData, ITripDialogProps } from "./AddTrip.types";
import { useAlert } from "@/hooks/useAlert";
import AlertComponent from "../AlertComponent/AlertComponent";
import { useTranslations } from "next-intl";
import {
  useKindeAuth,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

export function TripDialog({
  isOpen,
  onClose,
  userData,
  tripData = null,
  mode = "add",
}: ITripDialogProps) {
  const client = useKindeBrowserClient();
  const user = client.getUser();
  const t = useTranslations("Profile");
  const router = useRouter();
  const { locale } = useParams<{ locale: "tr" | "en" }>();
  const sortedCountries = getSortedCountries(locale);
  const countryNames = sortedCountries.map((item) => item.label);

  const [formData, setFormData] = useState<IFormData>({
    picture: tripData?.picture || null,
    country: tripData?.country || "",
    title: tripData?.title || "",
    description: tripData?.description || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        picture: tripData?.picture || null,
        country: tripData?.country || "",
        title: tripData?.title || "",
        description: tripData?.description || "",
      });
      setError("");
      setSuccess(false);
      setHasChanges(false);
    }
  }, [isOpen, tripData]);

  useEffect(() => {
    if (mode === "edit" && tripData) {
      const changed =
        formData.country !== (tripData.country || "") ||
        formData.title !== (tripData.title || "") ||
        formData.description !== (tripData.description || "") ||
        formData.picture instanceof File;

      setHasChanges(changed);
    } else {
      setHasChanges(true);
    }
  }, [formData, tripData, mode]);

  const { alert, hideAlert, showFileSizeError, showFileTypeError } = useAlert();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const validation = validateTripForm(formData);
      if (!validation.isValid) {
        setError(validation.error || t("validationFailed"));
        setIsLoading(false);
        return;
      }

      const result = await saveTripData({
        formData: {
          ...formData,
          countryCca2: sortedCountries.find(
            (item) => item.label === formData.country
          )?.cca2,
        },
        originalPicture: tripData?.picture || null,
        userId: user?.id || "",
        tripId: tripData?.id,
        mode,
      });

      if (!result.success) {
        setError(result.error || t("failedToSaveTrip"));
        setIsLoading(false);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        router.refresh();
        onClose();
      }, 1500);
    } catch (err) {
      //console.error("Trip save error:", err);
      setError(t("unexpectedError"));
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:h-[90vh] sm:max-w-[800px] overflow-y-auto bg-white border-indigo-200">
          <form onSubmit={handleSave}>
            <DialogHeader className="space-y-3 bg-white/95 backdrop-blur-xl pb-4 z-10">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-500 to-pink-400 bg-clip-text">
                {mode === "add" ? t("addNewTrip") : t("editTrip")}
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {mode === "add" ? t("shareYourExperience") : t("updateTrip")}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-6">
              {success && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/50 rounded-xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <div className="p-1 bg-green-500/20 rounded-lg">
                    <CheckCircle2
                      className="text-green-600 flex-shrink-0"
                      size={18}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 text-sm">
                      {mode === "add" ? "Trip Added!" : "Trip Updated!"}
                    </p>
                    <p className="text-xs text-green-500 mt-0.5">
                      {t("addTripSuccess")}
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-400/50 rounded-xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <div className="p-1 bg-red-500/20 rounded-lg">
                    <AlertCircle
                      className="text-red-300 flex-shrink-0"
                      size={18}
                    />
                  </div>
                  <p className="text-sm text-rose-600">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <ImageUpload
                  onFileSelect={(file) =>
                    handleInputChange("picture", file, setFormData, setError)
                  }
                  isLoading={isLoading}
                  onFileSizeError={showFileSizeError}
                  onFileTypeError={showFileTypeError}
                  initialPreviewUrl={tripData?.picture || null}
                />
                {mode === "edit" &&
                  !(formData.picture instanceof File) &&
                  tripData?.picture && (
                    <p className="text-xs text-slate-600">{t("currentPhoto")}</p>
                  )}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-800 flex items-center gap-2 font-semibold">
                  <Globe size={18} className="text-blue-500" />
                  {t("country")}
                  <span className="text-rose-500">*</span>
                </Label>
                <SelectComponent
                  canShowAll={false}
                  categories={countryNames}
                  handleValueChange={(selection) =>
                    handleInputChange(
                      "country",
                      selection,
                      setFormData,
                      setError
                    )
                  }
                  customStyle="w-full border-indigo-200 bg-slate-50 hover:bg-slate-100"
                  customPlaceholder={t("selectCountry")}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-slate-800 flex items-center gap-2 font-semibold"
                >
                  <FileText size={18} className="text-blue-500" />
                  {t("tripTitle")}
                  <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    handleInputChange(
                      "title",
                      e.target.value,
                      setFormData,
                      setError
                    )
                  }
                  placeholder={t("tripTitlePlaceholder")}
                  maxLength={100}
                  required
                  disabled={isLoading}
                  className="bg-slate-50 border-indigo-200 text-slate-900 focus:border-indigo-400 h-12"
                />
                <p className="text-xs text-slate-600">
                  {formData.title.length}/100 {t("characters")}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-800 flex items-center gap-2 font-semibold">
                  <FileText size={18} className="text-blue-500" />
                  {t("tripDescription")}
                  <span className="text-rose-500">*</span>
                </Label>
                <QuillEditor
                  value={formData.description}
                  onChange={(html) =>
                    handleInputChange(
                      "description",
                      html,
                      setFormData,
                      setError
                    )
                  }
                />
              </div>
            </div>

            <DialogFooter className="gap-2 bg-white/95 border-t border-indigo-100">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="border-indigo-200"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isLoading || (mode === "edit" && !hasChanges)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {t("saving")}
                  </>
                ) : mode === "add" ? (
                  t("addTrip")
                ) : (
                  t("saveChanges")
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AlertComponent
        open={alert.isOpen}
        title={alert.title}
        description={alert.description}
        handleCancel={hideAlert}
        cancelText={t("cancel")}
        href={alert.actionHref || ""}
        actionText={alert.actionText || ""}
        canShowAction={alert.showAction ?? true}
      />
    </div>
  );
}
