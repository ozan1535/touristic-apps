"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  User,
  AtSign,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleSave } from "./EditProfile.helpers";
import { IEditProfileDialogProps, IFormData } from "./EditProfile.types";
import ImageUpload from "../ImageUpload/ImageUpload";
import { handleInputChange } from "@/lib/helpers";
import { useAlert } from "@/hooks/useAlert";
import AlertComponent from "../AlertComponent/AlertComponent";
import { useTranslations } from "next-intl";

export function EditProfile({
  isOpen,
  onClose,
  userData,
}: IEditProfileDialogProps) {
  const router = useRouter();
  const t = useTranslations("Profile");
  const [formData, setFormData] = useState<IFormData>({
    username: userData.username,
    name: userData.name,
    picture: userData.picture,
    bio: userData.bio || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const {
    alert,
    hideAlert,
    showLoginRequired,
    showFileSizeError,
    showFileTypeError,
  } = useAlert();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: userData.username,
        name: userData.name,
        picture: userData.picture,
        bio: userData.bio || "",
      });
      setError("");
      setSuccess(false);
      setHasChanges(false);
    }
  }, [isOpen, userData]);

  useEffect(() => {
    const changed =
      formData.username !== userData.username ||
      formData.name !== userData.name ||
      formData.bio !== (userData.bio || "") ||
      formData.picture instanceof File;

    setHasChanges(changed);
  }, [formData, userData]);

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900/95 border-purple-400/30 backdrop-blur-xl">
          <form
            onSubmit={(e) =>
              handleSave(
                e,
                setError,
                setSuccess,
                setIsLoading,
                formData,
                userData,
                router,
                onClose
              )
            }
          >
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">
                {t("editProfile")}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {t("editDescription")}.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-6">
              {success && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/50 rounded-xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <div className="p-1 bg-green-500/20 rounded-lg">
                    <CheckCircle2
                      className="text-green-300 flex-shrink-0"
                      size={18}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-green-300 text-sm">
                      {t("profileUpdated")}
                    </p>
                    <p className="text-xs text-green-200 mt-0.5">
                      {formData.username !== userData.username
                        ? t("redirecting")
                        : t("changesSaved")}
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
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              <Label
                htmlFor="username"
                className="text-gray-200 flex items-center gap-2 font-semibold"
              >
                {t("profilePicture")}
              </Label>
              <div className="space-y-2">
                <ImageUpload
                  onFileSelect={(file) => {
                    setFormData((prev) => ({ ...prev, picture: file }));
                  }}
                  isLoading={isLoading}
                  onFileSizeError={showFileSizeError}
                  onFileTypeError={showFileTypeError}
                  initialPreviewUrl={formData.picture as string}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-200 flex items-center gap-2 font-semibold"
                >
                  <User size={16} className="text-purple-400" />
                  {t("displayName")}
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange(
                      "name",
                      e.target.value,
                      setFormData,
                      setError
                    )
                  }
                  placeholder={t("name")}
                  maxLength={50}
                  required
                  disabled={isLoading}
                  className="bg-slate-800/50 border-purple-400/30 text-gray-100 focus:border-purple-400 h-11"
                />
                <p className="text-xs text-gray-400">
                  {formData.name.length}/50 {t("characters")}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-gray-200 flex items-center gap-2 font-semibold"
                >
                  <AtSign size={16} className="text-purple-400" />
                  {t("username")}
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) => {
                    const sanitized = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9_]/g, "");
                    handleInputChange(
                      "username",
                      sanitized,
                      setFormData,
                      setError
                    );
                  }}
                  placeholder={t("username")}
                  maxLength={20}
                  minLength={3}
                  required
                  disabled={isLoading}
                  className="bg-slate-800/50 border-purple-400/30 text-gray-100 focus:border-purple-400 h-11"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">
                    {formData.username.length}/20 {t("characters")} (min 3)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bio"
                  className="text-gray-200 flex items-center gap-2 font-semibold"
                >
                  <FileText size={16} className="text-purple-400" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    handleInputChange(
                      "bio",
                      e.target.value,
                      setFormData,
                      setError
                    )
                  }
                  placeholder={t("tellUs")}
                  maxLength={150}
                  disabled={isLoading}
                  className="bg-slate-800/50 border-purple-400/30 text-gray-100 focus:border-purple-400 min-h-[100px] resize-none"
                />
                <p className="text-xs text-gray-400">
                  {formData.bio.length}/150 {t("characters")}
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="border-purple-400/30 hover:bg-slate-800/50"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !hasChanges}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    {t("saving")}
                  </>
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
